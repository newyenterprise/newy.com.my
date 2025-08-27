import { Profile } from './supabase'

export type UserRole = 'user' | 'admin' | 'moderator'

export function hasRole(profile: Profile | null, requiredRole: UserRole): boolean {
  if (!profile) return false
  
  const roleHierarchy: Record<UserRole, number> = {
    user: 1,
    moderator: 2,
    admin: 3
  }
  
  return roleHierarchy[profile.role] >= roleHierarchy[requiredRole]
}

export function isAdmin(profile: Profile | null): boolean {
  return hasRole(profile, 'admin')
}

export function isModerator(profile: Profile | null): boolean {
  return hasRole(profile, 'moderator')
}

export function isUser(profile: Profile | null): boolean {
  return hasRole(profile, 'user')
}

export function canAccessAdmin(profile: Profile | null): boolean {
  return isAdmin(profile)
}

export function canModerate(profile: Profile | null): boolean {
  return isModerator(profile) || isAdmin(profile)
}
