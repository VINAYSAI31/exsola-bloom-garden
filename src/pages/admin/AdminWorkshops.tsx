import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Upload, X } from "lucide-react";
import Swal from "sweetalert2";

interface Workshop {
  id: string;
  title: string;
  duration: string;
  format: string;
  learning_points: string[];
  take_home: string;
  best_for: string;
  price: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

const AdminWorkshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    format: "",
    learning_points: [""],
    take_home: "",
    best_for: "",
    price: "",
    image_url: "",
  });

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const { data, error } = await supabase
        .from("workshops")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWorkshops(data || []);
    } catch (error) {
      console.error("Error fetching workshops:", error);
      toast.error("Failed to fetch workshops");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `workshops/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const filteredPoints = formData.learning_points.filter(p => p.trim() !== "");
      
      if (filteredPoints.length === 0) {
        toast.error("Please add at least one learning point");
        return;
      }

      const workshopData = {
        title: formData.title,
        duration: formData.duration,
        format: formData.format,
        learning_points: filteredPoints,
        take_home: formData.take_home,
        best_for: formData.best_for,
        price: parseFloat(formData.price),
        image_url: imageUrl,
      };

      if (editingId) {
        const { error } = await supabase
          .from("workshops")
          .update(workshopData)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Workshop updated successfully!");
      } else {
        const { error } = await supabase
          .from("workshops")
          .insert([workshopData]);

        if (error) throw error;
        toast.success("Workshop created successfully!");
      }

      resetForm();
      fetchWorkshops();
    } catch (error) {
      console.error("Error saving workshop:", error);
      toast.error("Failed to save workshop");
    }
  };

  const handleEdit = (workshop: Workshop) => {
    setFormData({
      title: workshop.title,
      duration: workshop.duration,
      format: workshop.format,
      learning_points: workshop.learning_points,
      take_home: workshop.take_home,
      best_for: workshop.best_for,
      price: workshop.price.toString(),
      image_url: workshop.image_url || "",
    });
    setImagePreview(workshop.image_url);
    setEditingId(workshop.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const { error } = await supabase
          .from("workshops")
          .delete()
          .eq("id", id);

        if (error) throw error;

        toast.success("Workshop deleted successfully!");
        fetchWorkshops();
      } catch (error) {
        console.error("Error deleting workshop:", error);
        toast.error("Failed to delete workshop");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      duration: "",
      format: "",
      learning_points: [""],
      take_home: "",
      best_for: "",
      price: "",
      image_url: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setShowForm(false);
  };

  const addLearningPoint = () => {
    setFormData({
      ...formData,
      learning_points: [...formData.learning_points, ""],
    });
  };

  const updateLearningPoint = (index: number, value: string) => {
    const newPoints = [...formData.learning_points];
    newPoints[index] = value;
    setFormData({ ...formData, learning_points: newPoints });
  };

  const removeLearningPoint = (index: number) => {
    const newPoints = formData.learning_points.filter((_, i) => i !== index);
    setFormData({ ...formData, learning_points: newPoints });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Workshops</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Workshop"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Workshop" : "Add New Workshop"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Workshop Title *</label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Mushroom Growing Workshop"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Duration *</label>
                  <Input
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 2 hours"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Format *</label>
                  <Input
                    required
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    placeholder="e.g., Hands-on, live demonstration"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                  <Input
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., 499"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Learning Points *</label>
                {formData.learning_points.map((point, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={point}
                      onChange={(e) => updateLearningPoint(index, e.target.value)}
                      placeholder="What will participants learn?"
                    />
                    {formData.learning_points.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeLearningPoint(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addLearningPoint} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" /> Add Point
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Take Home *</label>
                <Input
                  required
                  value={formData.take_home}
                  onChange={(e) => setFormData({ ...formData, take_home: e.target.value })}
                  placeholder="e.g., A ready-to-grow mushroom kit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Best For *</label>
                <Textarea
                  required
                  value={formData.best_for}
                  onChange={(e) => setFormData({ ...formData, best_for: e.target.value })}
                  placeholder="e.g., Home growers, gardening enthusiasts, beginners"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Workshop Image</label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Max size: 5MB. Formats: JPG, PNG, WebP
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  {editingId ? "Update Workshop" : "Create Workshop"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <Card key={workshop.id} className="overflow-hidden">
            {workshop.image_url && (
              <img
                src={workshop.image_url}
                alt={workshop.title}
                className="w-full h-48 object-cover"
              />
            )}
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">{workshop.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {workshop.duration} | {workshop.format}
              </p>
              <p className="text-xl font-bold text-primary mb-4">₹{workshop.price}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(workshop)}
                  className="flex-1"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(workshop.id)}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {workshops.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No workshops found. Add your first workshop!</p>
        </div>
      )}
    </div>
  );
};

export default AdminWorkshops;
