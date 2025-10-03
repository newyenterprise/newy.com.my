"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import { Plus, Edit, Trash2, Eye, Calendar, Clock, Tag, Search } from "lucide-react";
import { supabase, BlogPost } from "../../../lib/supabase";

export default function BlogManagementPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
      } else {
        setBlogPosts(data || []);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting blog post:', error);
        alert('Error deleting blog post');
      } else {
        setBlogPosts(posts => posts.filter(post => post.id !== id));
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Error deleting blog post');
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : undefined
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating blog post:', error);
        alert('Error updating blog post');
      } else {
        setBlogPosts(posts => 
          posts.map(post => 
            post.id === id 
              ? { 
                  ...post, 
                  published: !currentStatus,
                  published_at: !currentStatus ? new Date().toISOString() : undefined
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert('Error updating blog post');
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "published" && post.published) ||
                         (filterStatus === "draft" && !post.published);

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900">
                Blog Management
              </h1>
              <p className="text-gray-500 mt-2">
                Create, edit, and manage your blog posts
              </p>
            </div>
            <Link href="/admin/blog/new">
              <Button className="btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12 space-y-6">

      {/* Filters */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "published" | "draft")}
              className="px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-gray-900 cursor-pointer"
            >
              <option value="all" className="bg-white text-gray-900">All Posts</option>
              <option value="published" className="bg-white text-gray-900">Published</option>
              <option value="draft" className="bg-white text-gray-900">Drafts</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{blogPosts.length}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">Published</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{blogPosts.filter(p => p.published).length}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">Drafts</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{blogPosts.filter(p => !p.published).length}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Edit className="h-6 w-6 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blog Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || filterStatus !== "all" 
                    ? "Try adjusting your search or filter criteria"
                    : "Get started by creating your first blog post"
                  }
                </p>
                <Link href="/admin/blog/new">
                  <Button className="btn-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Post
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all group">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {post.title}
                      </h3>
                      <Badge 
                        variant={post.published ? "default" : "secondary"}
                        className={post.published ? "bg-green-100 text-green-700 border border-green-200" : "bg-gray-100 text-gray-700 border border-gray-200"}
                      >
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                      {post.featured && (
                        <Badge variant="outline" className="border-yellow-300 text-yellow-700 bg-yellow-50">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    )}
                    
                    <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500">
                      {post.category && (
                        <div className="flex items-center gap-1.5">
                          <Tag className="h-3.5 w-3.5 text-gray-500" />
                          <span>{post.category}</span>
                        </div>
                      )}
                      {post.read_time && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-gray-500" />
                          <span>{post.read_time} min read</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-gray-500" />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5 text-gray-500" />
                        <span>{post.views} views</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublished(post.id, post.published)}
                      className={`hover:bg-gray-100 text-gray-700`}
                    >
                      {post.published ? "Unpublish" : "Publish"}
                    </Button>
                    <Link href={`/admin/blog/edit/${post.id}`}>
                      <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      </div>
    </div>
  );
}
