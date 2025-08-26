"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">Blog Management</h1>
          <p className="text-muted-foreground mt-2">
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

      {/* Filters */}
      <Card className="border-purple-500/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "published" | "draft")}
              className="px-4 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            >
              <option value="all">All Posts</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold">{blogPosts.length}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{blogPosts.filter(p => p.published).length}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold">{blogPosts.filter(p => !p.published).length}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <Edit className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blog Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="border-purple-500/20">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No blog posts found</h3>
                <p className="text-muted-foreground mb-4">
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
            <Card key={post.id} className="border-purple-500/20">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <Badge 
                        variant={post.published ? "default" : "secondary"}
                        className={post.published ? "bg-green-500/20 text-green-300 border-green-500/30" : ""}
                      >
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                      {post.featured && (
                        <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {post.category && (
                        <div className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          {post.category}
                        </div>
                      )}
                      {post.read_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.read_time} min read
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.views} views
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublished(post.id, post.published)}
                      className={post.published ? "text-yellow-400 hover:text-yellow-300" : "text-green-400 hover:text-green-300"}
                    >
                      {post.published ? "Unpublish" : "Publish"}
                    </Button>
                    <Link href={`/admin/blog/edit/${post.id}`}>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      className="text-red-400 hover:text-red-300"
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
  );
}
