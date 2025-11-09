import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import Swal from "sweetalert2";

interface Event {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  event_date: string | null;
  location: string | null;
  created_at: string;
}

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch events");
      console.error(error);
    } else {
      setEvents(data || []);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) {
      toast.error("Failed to upload image");
      console.error(uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = currentEvent?.image_url || null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          setLoading(false);
          return;
        }
      }

      const eventData = {
        ...formData,
        image_url: imageUrl,
      };

      if (isEditing && currentEvent) {
        const { error } = await supabase
          .from("events")
          .update(eventData)
          .eq("id", currentEvent.id);

        if (error) throw error;
        toast.success("Event updated successfully");
      } else {
        const { error } = await supabase.from("events").insert([eventData]);

        if (error) throw error;
        toast.success("Event created successfully");
      }

      resetForm();
      fetchEvents();
    } catch (error) {
      toast.error("Failed to save event");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setIsEditing(true);
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      event_date: event.event_date || "",
      location: event.location || "",
    });
    setImagePreview(event.image_url);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const { error } = await supabase.from("events").delete().eq("id", id);

      if (error) {
        toast.error("Failed to delete event");
        console.error(error);
      } else {
        toast.success("Event deleted successfully");
        fetchEvents();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      event_date: "",
      location: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setIsEditing(false);
    setCurrentEvent(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Event
          </Button>
        )}
      </div>

      {isEditing && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {currentEvent ? "Edit Event" : "Add New Event"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={8}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Event Date
                </label>
                <Input
                  type="date"
                  value={formData.event_date}
                  onChange={(e) =>
                    setFormData({ ...formData, event_date: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 w-full max-w-md rounded-lg"
                  />
                )}
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : currentEvent ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            {event.image_url && (
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                {event.description}
              </p>
              {event.event_date && (
                <p className="text-sm text-gray-500">
                  Date: {new Date(event.event_date).toLocaleDateString()}
                </p>
              )}
              {event.location && (
                <p className="text-sm text-gray-500">Location: {event.location}</p>
              )}
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(event)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(event.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
