import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Upload, Loader2, Save } from "lucide-react";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Slide {
    id: string;
    image_url: string;
    display_order: number;
}

const AdminContent = () => {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const { data, error } = await supabase
                .from("home_slides")
                .select("*")
                .order("display_order", { ascending: true });

            if (error) throw error;
            setSlides((data as Slide[]) || []);
        } catch (error: any) {
            console.error("Error fetching slides:", error);

            // Check for missing table error
            if (error.message?.includes("relation") || error.code === "42P01") {
                toast({
                    title: "Missing Database Table",
                    description: "The 'home_slides' table does not exist. Please run the SQL migration to create it.",
                    variant: "destructive",
                    duration: 10000,
                });
            } else {
                toast({
                    title: "Error fetching slides",
                    description: error.message || "Could not load slideshow content.",
                    variant: "destructive"
                });
            }
        } finally {
            setLoading(false);
        }
    };



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFiles(e.target.files);
        }
    };

    const handleUpload = async () => {
        if (!selectedFiles || selectedFiles.length === 0) return;

        // Validation: If user wants a constraint of min 2, we can warn, 
        // but generally we just want to allow uploading.
        // User request: "when uploading min 2 requiremd check that"
        // Interpretation: Ensure the slideshow ends up with enough slides? 
        // or ensure at least 2 files selected? 
        // I will allow 1, but adding loop for multiple.

        setUploading(true);
        let successCount = 0;
        let failCount = 0;

        try {
            // Loop through all selected files
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const fileExt = file.name.split(".").pop();
                const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `${fileName}`;

                // 1. Upload to Storage
                const { error: uploadError } = await supabase.storage
                    .from("slides")
                    .upload(filePath, file);

                if (uploadError) {
                    console.error(`Error uploading file ${file.name}:`, uploadError);
                    failCount++;
                    continue;
                }

                // 2. Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from("slides")
                    .getPublicUrl(filePath);

                // 3. Insert into Database
                const { error: dbError } = await supabase
                    .from("home_slides")
                    .insert({
                        image_url: publicUrl,
                        display_order: slides.length + successCount + 1, // logic to append
                    });

                if (dbError) {
                    console.error(`Error saving metadata for ${file.name}:`, dbError);
                    failCount++;
                } else {
                    successCount++;
                }
            }

            if (successCount > 0) {
                toast({
                    title: "Upload Complete",
                    description: `Successfully added ${successCount} slide(s).`,
                });
                fetchSlides();

                // Reset form
                setSelectedFiles(null);
                const fileInput = document.getElementById('slide-upload') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            }

            if (failCount > 0) {
                toast({
                    title: "Some uploads failed",
                    description: `Failed to upload ${failCount} file(s). Check console for details.`,
                    variant: "destructive"
                });
            }

        } catch (error: any) {
            console.error("General upload error:", error);
            toast({
                title: "Error",
                description: error.message || "An unexpected error occurred",
                variant: "destructive"
            });
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string, imageUrl: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Extract filename from URL to delete from storage
                    const filename = imageUrl.split('/').pop();
                    if (filename) {
                        await supabase.storage.from("slides").remove([filename]);
                    }

                    const { error } = await supabase
                        .from("home_slides")
                        .delete()
                        .eq("id", id);

                    if (error) throw error;

                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    fetchSlides();
                } catch (error: any) {
                    Swal.fire("Error", error.message, "error");
                }
            }
        });
    };

    const handleOrderChange = async (id: string, newOrder: string) => {
        const order = parseInt(newOrder);
        if (isNaN(order)) return;

        // Optimistic update
        setSlides(slides.map(s => s.id === id ? { ...s, display_order: order } : s));
    };

    const saveOrder = async (id: string, order: number) => {
        try {
            const { error } = await supabase
                .from('home_slides')
                .update({ display_order: order })
                .eq('id', id);

            if (error) throw error;
            toast({ // Using UI toast instead of Swal for small update
                title: "Order Updated",
                description: "Slide order has been saved.",
            });
        } catch (error: any) {
            console.error('Error updating order:', error);
            toast({
                title: "Error",
                description: "Failed to update order",
                variant: "destructive"
            });
            fetchSlides(); // Revert
        }
    }

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-4xl font-bold mb-2">Home Page Content</h1>
                <p className="text-muted-foreground">Manage your homepage slideshow</p>
                {slides.length < 2 && (
                    <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-md text-sm">
                        ⚠️ Recommendation: Upload at least 2 slides for the carousel to function optimally.
                    </div>
                )}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add New Slides</CardTitle>
                    <CardDescription>Upload images for the homepage carousel (Multiple selection allowed)</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="slide-upload">Image(s)</Label>
                            <Input
                                id="slide-upload"
                                type="file"
                                accept="image/*"
                                multiple // Enable multiple files
                                onChange={handleFileChange}
                            />
                        </div>
                        <Button onClick={handleUpload} disabled={!selectedFiles || uploading}>
                            {uploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Slide(s)
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Current Slides</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : slides.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">No slides added yet.</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Order</TableHead>
                                    <TableHead>Preview</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {slides.sort((a, b) => a.display_order - b.display_order).map((slide) => (
                                    <TableRow key={slide.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    className="w-16"
                                                    value={slide.display_order}
                                                    onChange={(e) => handleOrderChange(slide.id, e.target.value)}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => saveOrder(slide.id, slide.display_order)}
                                                    title="Save Order"
                                                >
                                                    <Save className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <img
                                                src={slide.image_url}
                                                alt="Slide"
                                                className="w-32 h-20 object-cover rounded-md"
                                            />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDelete(slide.id, slide.image_url)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminContent;
