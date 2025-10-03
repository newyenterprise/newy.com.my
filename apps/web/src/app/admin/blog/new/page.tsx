"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import { Save, Eye, ArrowLeft, Plus, X, Sparkles } from "lucide-react";
import { supabase } from "../../../../lib/supabase";
import { RichTextEditor } from "../../../../components/rich-text-editor";
import readingTime from "reading-time";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [] as string[],
    featured: false,
    published: false,
    read_time: 5,
    featured_image: "",
  });
  const [newTag, setNewTag] = useState("");
  const [showAIImageSuggestions, setShowAIImageSuggestions] = useState(false);
  const [imageSuggestions, setImageSuggestions] = useState<any[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      // Auto-generate slug from title
      if (name === "title") {
        const slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        setFormData(prev => ({
          ...prev,
          slug
        }));
      }
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content
    }));

    // Auto-calculate reading time
    if (content) {
      const stats = readingTime(content);
      setFormData(prev => ({
        ...prev,
        read_time: Math.ceil(stats.minutes)
      }));
    }
  };

  const handleGenerateImageSuggestions = async () => {
    setIsLoadingSuggestions(true);
    try {
      const response = await fetch('/api/generate-image-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: formData.title,
          content: formData.content 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate suggestions');
      }

      const data = await response.json();
      setImageSuggestions(data.suggestions);
      setShowAIImageSuggestions(true);
    } catch (error) {
      console.error('Error generating image suggestions:', error);
      alert('Failed to generate image suggestions');
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const postData = {
        ...formData,
        published: publish,
        published_at: publish ? new Date().toISOString() : undefined,
      };

      const { error } = await supabase
        .from('blog_posts')
        .insert([postData]);

      if (error) {
        console.error('Error creating blog post:', error);
        alert('Error creating blog post');
      } else {
        router.push('/admin/blog');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Error creating blog post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="border-l border-gray-200 pl-4">
                <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900">
                  Create New Blog Post
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Create a new blog post for your website
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={(e) => handleSubmit(e, false)}
                disabled={isLoading || !formData.title || !formData.content}
                className="border-gray-300 hover:bg-gray-100"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button
                onClick={(e) => handleSubmit(e, true)}
                disabled={isLoading || !formData.title || !formData.content}
                className="btn-primary"
              >
                <Eye className="mr-2 h-4 w-4" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)} className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-gray-300 rounded-full"></div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">Post Content</CardTitle>
                    <CardDescription className="text-gray-500">
                      The main content and details of your blog post
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold mb-2 text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter post title..."
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-semibold mb-2 text-gray-700">
                    URL Slug <span className="text-red-500">*</span>
                    <span className="text-xs font-normal text-gray-500 ml-2">(Auto-generated from title)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      placeholder="url-friendly-slug"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-gray-900 placeholder:text-gray-400 font-mono text-sm"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">/blog/{formData.slug || '...'}</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="excerpt" className="block text-sm font-semibold mb-2 text-gray-700">
                    Excerpt
                    <span className="text-xs font-normal text-gray-500 ml-2">(Brief description for previews)</span>
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Brief description of the post..."
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 resize-none transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-semibold mb-2 text-gray-700">
                    Content <span className="text-red-500">*</span>
                    <span className="text-xs font-normal text-gray-500 ml-2">
                      (Rich text editor with AI assistance)
                    </span>
                  </label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                    <RichTextEditor
                      content={formData.content}
                      onChange={handleContentChange}
                      placeholder="Start writing your blog post... Use the AI button in the toolbar for content suggestions!"
                    />
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-gray-500" />
                      <span><strong>Pro tip:</strong> Use the AI button in the toolbar to generate content instantly!</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-gray-300 rounded-full"></div>
                  <CardTitle className="text-lg text-gray-900">Post Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold mb-2 text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-gray-900 cursor-pointer"
                  >
                    <option value="" className="bg-white text-gray-900">Select category</option>
                    <option value="Web Development" className="bg-white text-gray-900">Web Development</option>
                    <option value="Mobile Apps" className="bg-white text-gray-900">Mobile Apps</option>
                    <option value="AI Automation" className="bg-white text-gray-900">AI Automation</option>
                    <option value="Digital Marketing" className="bg-white text-gray-900">Digital Marketing</option>
                    <option value="Technology" className="bg-white text-gray-900">Technology</option>
                    <option value="Business" className="bg-white text-gray-900">Business</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="read_time" className="block text-sm font-semibold mb-2 text-gray-700">
                    Read Time
                    <span className="text-xs font-normal text-gray-500 ml-2">(minutes)</span>
                  </label>
                  <input
                    type="number"
                    id="read_time"
                    name="read_time"
                    value={formData.read_time}
                    onChange={handleInputChange}
                    min="1"
                    max="60"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-gray-900"
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    Auto-calculated from content
                  </p>
                </div>

                <div>
                  <label htmlFor="featured_image" className="block text-sm font-semibold mb-2 text-gray-700">
                    Featured Image
                  </label>
                  <div className="space-y-3">
                    <input
                      type="url"
                      id="featured_image"
                      name="featured_image"
                      value={formData.featured_image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-gray-900 placeholder:text-gray-400 text-sm"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateImageSuggestions}
                      disabled={isLoadingSuggestions || !formData.title}
                      className="w-full border-gray-300 hover:bg-gray-100 text-gray-700"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      {isLoadingSuggestions ? 'Generating...' : 'AI Image Suggestions'}
                    </Button>
                  </div>
                  
                  {showAIImageSuggestions && imageSuggestions.length > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">AI Suggested Images:</p>
                      <div className="space-y-2">
                        {imageSuggestions.map((suggestion, index) => (
                          <div key={index} className="text-xs">
                            <p className="text-gray-600 mb-1">{suggestion.term}</p>
                            <a
                              href={suggestion.searchUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-500 underline"
                            >
                              Search on Unsplash →
                            </a>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Click the links to find relevant images on Unsplash
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <label htmlFor="featured" className="text-sm font-semibold text-gray-700 cursor-pointer">
                    Featured Post
                    <span className="block text-xs text-gray-500 font-normal mt-0.5">Show on homepage</span>
                  </label>
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-gray-300 rounded-full"></div>
                  <div>
                    <CardTitle className="text-lg text-gray-900">Tags</CardTitle>
                    <CardDescription className="text-gray-500">
                      Add tags to help categorize your post
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add tag..."
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-gray-900 placeholder:text-gray-400"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTag}
                    className="border-gray-300 hover:bg-gray-100 px-4"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1.5 bg-gray-100 border border-gray-300 text-gray-700"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 opacity-70 hover:opacity-100 hover:text-red-600 transition-all"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
