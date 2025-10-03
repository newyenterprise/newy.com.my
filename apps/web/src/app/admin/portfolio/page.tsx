"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import { Plus, Edit, Trash2, Eye, Calendar, Globe, Github, Search, Filter } from "lucide-react";
import { supabase, PortfolioProject } from "../../../lib/supabase";

export default function PortfolioManagementPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "website" | "app" | "ai_automation" | "marketing">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "in_progress" | "completed" | "maintenance">("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching portfolio projects:', error);
      } else {
        setProjects(data || []);
      }
    } catch (error) {
      console.error('Error fetching portfolio projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project');
      } else {
        setProjects(projects => projects.filter(project => project.id !== id));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project');
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .update({ featured: !currentStatus })
        .eq('id', id);

      if (error) {
        console.error('Error updating project:', error);
        alert('Error updating project');
      } else {
        setProjects(projects => 
          projects.map(project => 
            project.id === id 
              ? { ...project, featured: !currentStatus }
              : project
          )
        );
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error updating project');
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || project.project_type === filterType;
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'maintenance':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'website':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'app':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'ai_automation':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'marketing':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">Portfolio Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your portfolio projects and showcase your work
          </p>
        </div>
        <Link href="/admin/portfolio/new">
          <Button className="btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 text-gray-900"
            >
              <option value="all">All Types</option>
              <option value="website">Website</option>
              <option value="app">App</option>
              <option value="ai_automation">AI Automation</option>
              <option value="marketing">Marketing</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 text-gray-900"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Eye className="h-4 w-4 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'completed').length}</p>
              </div>
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'in_progress').length}</p>
              </div>
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Edit className="h-4 w-4 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Featured</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.featured).length}</p>
              </div>
              <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Filter className="h-4 w-4 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full">
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm || filterType !== "all" || filterStatus !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "Get started by adding your first project"
                    }
                  </p>
                  <Link href="/admin/portfolio/new">
                    <Button className="btn-primary">
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Project
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge className={getTypeColor(project.project_type)}>
                      {project.project_type.replace('_', ' ')}
                    </Badge>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace('_', ' ')}
                    </Badge>
                    {project.featured && (
                      <Badge variant="outline" className="border-yellow-300 text-yellow-700 bg-yellow-50">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {project.client_name && (
                    <p className="text-sm text-gray-500">
                      Client: {project.client_name}
                    </p>
                  )}

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 rounded text-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 rounded text-gray-600">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <Globe className="h-4 w-4" />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFeatured(project.id, project.featured)}
                        className="text-gray-700 hover:bg-gray-100"
                      >
                        {project.featured ? "Unfeature" : "Feature"}
                      </Button>
                      <Link href={`/admin/portfolio/edit/${project.id}`}>
                        <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
