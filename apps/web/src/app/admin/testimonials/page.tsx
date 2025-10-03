"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import { Plus, Edit, Trash2, Star, Search, CheckCircle, X, Building, User } from "lucide-react";
import { supabase, Testimonial } from "../../../lib/supabase";

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending">("all");
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<{
    client_name: string;
    client_company: string;
    client_position: string;
    testimonial: string;
    rating: number;
    project_type: 'website' | 'app' | 'ai_automation' | 'marketing' | '';
    featured: boolean;
    approved: boolean;
  }>({
    client_name: "",
    client_company: "",
    client_position: "",
    testimonial: "",
    rating: 5,
    project_type: "",
    featured: false,
    approved: false,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching testimonials:', error);
      } else {
        setTestimonials(data || []);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting testimonial:', error);
        alert('Error deleting testimonial');
      } else {
        setTestimonials(testimonials => testimonials.filter(t => t.id !== id));
        if (selectedTestimonial?.id === id) {
          setSelectedTestimonial(null);
        }
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Error deleting testimonial');
    }
  };

  const toggleApproved = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ approved: !currentStatus })
        .eq('id', id);

      if (error) {
        console.error('Error updating testimonial:', error);
        alert('Error updating testimonial');
      } else {
        setTestimonials(testimonials => 
          testimonials.map(testimonial => 
            testimonial.id === id 
              ? { ...testimonial, approved: !currentStatus }
              : testimonial
          )
        );
        if (selectedTestimonial?.id === id) {
          setSelectedTestimonial(prev => prev ? { ...prev, approved: !currentStatus } : null);
        }
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
      alert('Error updating testimonial');
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ featured: !currentStatus })
        .eq('id', id);

      if (error) {
        console.error('Error updating testimonial:', error);
        alert('Error updating testimonial');
      } else {
        setTestimonials(testimonials => 
          testimonials.map(testimonial => 
            testimonial.id === id 
              ? { ...testimonial, featured: !currentStatus }
              : testimonial
          )
        );
        if (selectedTestimonial?.id === id) {
          setSelectedTestimonial(prev => prev ? { ...prev, featured: !currentStatus } : null);
        }
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
      alert('Error updating testimonial');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setEditForm({
      client_name: testimonial.client_name,
      client_company: testimonial.client_company || "",
      client_position: testimonial.client_position || "",
      testimonial: testimonial.testimonial,
      rating: testimonial.rating || 5,
      project_type: testimonial.project_type || "",
      featured: testimonial.featured,
      approved: testimonial.approved,
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedTestimonial) return;

    try {
      const updateData = {
        ...editForm,
        project_type: editForm.project_type === '' ? null : editForm.project_type
      };
      const { error } = await supabase
        .from('testimonials')
        .update(updateData)
        .eq('id', selectedTestimonial.id);

      if (error) {
        console.error('Error updating testimonial:', error);
        alert('Error updating testimonial');
      } else {
        setTestimonials(testimonials => 
          testimonials.map(testimonial => 
            testimonial.id === selectedTestimonial.id 
              ? { 
                  ...testimonial, 
                  ...editForm,
                  project_type: editForm.project_type === '' ? undefined : editForm.project_type as 'website' | 'app' | 'ai_automation' | 'marketing'
                }
              : testimonial
          )
        );
        setSelectedTestimonial({ 
          ...selectedTestimonial, 
          ...editForm,
          project_type: editForm.project_type === '' ? undefined : editForm.project_type as 'website' | 'app' | 'ai_automation' | 'marketing'
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
      alert('Error updating testimonial');
    }
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.client_company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.testimonial.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "approved" && testimonial.approved) ||
                         (filterStatus === "pending" && !testimonial.approved);

    return matchesSearch && matchesStatus;
  });

  const getProjectTypeColor = (type?: string) => {
    if (!type) return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    
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

  const renderStars = (rating?: number) => {
    const stars = [];
    const actualRating = rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= actualRating ? 'text-yellow-400 fill-current' : 'text-gray-400'
          }`}
        />
      );
    }
    return stars;
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
          <h1 className="text-3xl font-bold font-display">Testimonials Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage client testimonials and reviews
          </p>
        </div>
        <Button className="btn-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      {/* Filters */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search testimonials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 text-gray-900"
            >
              <option value="all">All Testimonials</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Approval</option>
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
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{testimonials.length}</p>
              </div>
              <Star className="h-4 w-4 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">{testimonials.filter(t => t.approved).length}</p>
              </div>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{testimonials.filter(t => !t.approved).length}</p>
              </div>
              <X className="h-4 w-4 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Featured</p>
                <p className="text-2xl font-bold">{testimonials.filter(t => t.featured).length}</p>
              </div>
              <Star className="h-4 w-4 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials List */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredTestimonials.length === 0 ? (
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No testimonials found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm || filterStatus !== "all" 
                      ? "Try adjusting your search or filter criteria"
                      : "Get started by adding your first testimonial"
                    }
                  </p>
                  <Button className="btn-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Testimonial
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredTestimonials.map((testimonial) => (
              <Card 
                key={testimonial.id} 
                className={`border border-gray-200 bg-white shadow-sm cursor-pointer transition-all hover:shadow-md ${
                  selectedTestimonial?.id === testimonial.id ? 'ring-2 ring-gray-300' : ''
                }`}
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{testimonial.client_name}</h3>
                        {testimonial.client_position && testimonial.client_company && (
                          <p className="text-sm text-muted-foreground">
                            {testimonial.client_position} at {testimonial.client_company}
                          </p>
                        )}
                        <div className="flex items-center gap-1 mt-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={testimonial.approved ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}>
                          {testimonial.approved ? 'Approved' : 'Pending'}
                        </Badge>
                        {testimonial.featured && (
                          <Badge variant="outline" className="border-yellow-300 text-yellow-700 bg-yellow-50">
                            Featured
                          </Badge>
                        )}
                        {testimonial.project_type && (
                          <Badge className={getProjectTypeColor(testimonial.project_type)}>
                            {testimonial.project_type.replace('_', ' ')}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-3 italic">"{testimonial.testimonial}"</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(testimonial.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Testimonial Details */}
        {selectedTestimonial && (
          <Card className="border border-gray-200 bg-white shadow-sm sticky top-6">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle>{isEditing ? 'Edit Testimonial' : 'Testimonial Details'}</CardTitle>
                <div className="flex items-center gap-2">
                  {!isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(selectedTestimonial)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedTestimonial(null);
                      setIsEditing(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                /* Edit Form */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Client Name</label>
                    <input
                      type="text"
                      value={editForm.client_name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, client_name: e.target.value }))}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={editForm.client_company}
                      onChange={(e) => setEditForm(prev => ({ ...prev, client_company: e.target.value }))}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Position</label>
                    <input
                      type="text"
                      value={editForm.client_position}
                      onChange={(e) => setEditForm(prev => ({ ...prev, client_position: e.target.value }))}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Testimonial</label>
                    <textarea
                      value={editForm.testimonial}
                      onChange={(e) => setEditForm(prev => ({ ...prev, testimonial: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <select
                      value={editForm.rating}
                      onChange={(e) => setEditForm(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editForm.approved}
                        onChange={(e) => setEditForm(prev => ({ ...prev, approved: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Approved</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editForm.featured}
                        onChange={(e) => setEditForm(prev => ({ ...prev, featured: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Featured</span>
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveEdit} className="btn-primary flex-1">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <>
                  {/* Client Info */}
                  <div>
                    <h4 className="font-semibold mb-3">Client Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-gray-900">{selectedTestimonial.client_name}</span>
                      </div>
                      {selectedTestimonial.client_company && (
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-gray-900">
                            {selectedTestimonial.client_position && `${selectedTestimonial.client_position} at `}
                            {selectedTestimonial.client_company}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <div className="flex items-center gap-1">
                          {renderStars(selectedTestimonial.rating)}
                          <span className="text-sm text-gray-600 ml-1">
                            ({selectedTestimonial.rating}/5)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div>
                    <h4 className="font-semibold mb-3">Testimonial</h4>
                    <div className="text-sm bg-gray-50 p-4 rounded-lg italic text-gray-900">
                      "{selectedTestimonial.testimonial}"
                    </div>
                  </div>

                  {/* Status Actions */}
                  <div>
                    <h4 className="font-semibold mb-3">Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleApproved(selectedTestimonial.id, selectedTestimonial.approved)}
                        className="text-gray-700 hover:bg-gray-100"
                      >
                        {selectedTestimonial.approved ? 'Unapprove' : 'Approve'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFeatured(selectedTestimonial.id, selectedTestimonial.featured)}
                        className="text-gray-700 hover:bg-gray-100"
                      >
                        {selectedTestimonial.featured ? 'Unfeature' : 'Feature'}
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(selectedTestimonial.id)}
                      className="w-full mt-2 text-red-700 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Testimonial
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
