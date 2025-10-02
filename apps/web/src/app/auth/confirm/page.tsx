"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@digitallinked/ui';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');

        if (!token_hash || type !== 'email') {
          setStatus('error');
          setMessage('Invalid confirmation link');
          return;
        }

        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: 'email',
        });

        if (error) {
          setStatus('error');
          setMessage(error.message || 'Failed to confirm email');
        } else {
          setStatus('success');
          setMessage('Your email has been confirmed successfully!');
          
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        }
      } catch (error) {
        setStatus('error');
        setMessage('An unexpected error occurred');
      }
    };

    confirmEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <Card className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-2xl">
            Email Confirmation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {status === 'loading' && (
            <>
              <Loader2 className="w-16 h-16 text-purple-400 mx-auto animate-spin" />
              <p className="text-gray-300">Confirming your email...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
              <div>
                <p className="text-gray-300 text-lg mb-2">{message}</p>
                <p className="text-gray-400 text-sm">Redirecting you to your dashboard...</p>
              </div>
              <Link href="/dashboard">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:opacity-90">
                  Go to Dashboard
                </Button>
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-16 h-16 text-red-400 mx-auto" />
              <div>
                <p className="text-gray-300 text-lg mb-2">Confirmation Failed</p>
                <p className="text-gray-400 text-sm">{message}</p>
              </div>
              <div className="space-y-2">
                <Link href="/auth/login">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:opacity-90">
                    Go to Login
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

