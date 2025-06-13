"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ArrowLeft, Image as ImageIcon, Plus, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ItineraryItem {
  time: string;
  details: string;
}

export default function CreateTour() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingImages, setDeletingImages] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState({
    tourName: "",
    price: "",
    booking: "0",
    rating: "5",
    difficulty: "Medium",
    level: "Intermediate",
    hikeType: "Day Hike",
    location: "",
    description: "",
    summary: "",
  });

  const [date, setDate] = useState<Date>();
  const [images, setImages] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [inclusive, setInclusive] = useState<string[]>([]);
  const [exclusive, setExclusive] = useState<string[]>([]);
  const [newItineraryItem, setNewItineraryItem] = useState({
    time: "",
    details: "",
  });
  const [newInclusiveItem, setNewInclusiveItem] = useState("");
  const [newExclusiveItem, setNewExclusiveItem] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.url);
        } else {
          toast.error(`Failed to upload ${file.name}`);
        }
      }

      setImages([...images, ...uploadedUrls]);
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
    } catch {
      toast.error("Error uploading images");
    } finally {
      setIsUploading(false);
    }
  };

  const extractPublicId = (imageUrl: string): string => {
    try {
      const parts = imageUrl.split("/");
      const uploadIndex = parts.findIndex((part) => part === "upload");
      if (uploadIndex === -1) return "";

      const pathAfterUpload = parts.slice(uploadIndex + 2).join("/");
      const publicIdWithExtension = pathAfterUpload.replace(
        "tumaini-tours/",
        ""
      );
      const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

      return `tumaini-tours/${publicId}`;
    } catch (error) {
      console.error("Error extracting public ID:", error);
      return "";
    }
  };

  const deleteImageFromCloudinary = async (
    imageUrl: string
  ): Promise<boolean> => {
    try {
      const publicId = extractPublicId(imageUrl);
      if (!publicId) {
        console.error("Could not extract public ID from URL:", imageUrl);
        return false;
      }

      const response = await fetch("/api/upload", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary deletion failed:", errorData);
        return false;
      }

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
      return false;
    }
  };

  const removeImage = async (index: number) => {
    const imageUrl = images[index];
    setDeletingImages((prev) => new Set(prev).add(index));

    try {
      const deleted = await deleteImageFromCloudinary(imageUrl);
      if (deleted) {
        setImages(images.filter((_, i) => i !== index));
        toast.success("Image deleted successfully");
      } else {
        toast.error("Failed to delete image from cloud storage");
      }
    } catch (error) {
      console.error("Error removing image:", error);
      toast.error("Failed to delete image");
    } finally {
      setDeletingImages((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }
  };

  const addItineraryItem = () => {
    if (newItineraryItem.time.trim() && newItineraryItem.details.trim()) {
      setItinerary([...itinerary, { ...newItineraryItem }]);
      setNewItineraryItem({ time: "", details: "" });
    }
  };

  const removeItineraryItem = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  const addListItem = (type: "inclusive" | "exclusive") => {
    if (type === "inclusive" && newInclusiveItem.trim()) {
      setInclusive([...inclusive, newInclusiveItem.trim()]);
      setNewInclusiveItem("");
    } else if (type === "exclusive" && newExclusiveItem.trim()) {
      setExclusive([...exclusive, newExclusiveItem.trim()]);
      setNewExclusiveItem("");
    }
  };

  const removeListItem = (type: "inclusive" | "exclusive", index: number) => {
    if (type === "inclusive") {
      setInclusive(inclusive.filter((_, i) => i !== index));
    } else if (type === "exclusive") {
      setExclusive(exclusive.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast.error("Please select a tour date");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/tours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: format(date, "yyyy-MM-dd"),
          images,
          itinerary,
          inclusive,
          exclusive,
        }),
      });

      if (response.ok) {
        toast.success("Tour created successfully!");
        router.push("/admin/dashboard");
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to create tour");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Create New Tour</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tourName">Tour Name *</Label>
                  <Input
                    id="tourName"
                    name="tourName"
                    value={formData.tourName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price (KES) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="booking">Current Bookings</Label>
                  <Input
                    id="booking"
                    name="booking"
                    type="number"
                    value={formData.booking}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="date">Tour Date *</Label>
                <DatePicker
                  date={date}
                  onDateChange={setDate}
                  placeholder="Select tour date"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Images Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Tour Images *</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="images">Upload Images</Label>
                <div className="mt-2">
                  <input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("images")?.click()}
                    disabled={isUploading}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? "Uploading..." : "Upload Images"}
                  </Button>
                </div>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((url, index) => (
                    <div
                      key={index}
                      className="relative group border rounded-lg overflow-hidden bg-gray-50"
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={url}
                          alt={`Tour image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                      </div>
                      <div className="absolute top-2 right-2">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(index)}
                          disabled={deletingImages.has(index)}
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {deletingImages.has(index) ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {images.length === 0 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No images uploaded yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tour Details */}
          <Card>
            <CardHeader>
              <CardTitle>Tour Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="level">Level</Label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="hikeType">Hike Type</Label>
                  <select
                    id="hikeType"
                    name="hikeType"
                    value={formData.hikeType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Day Hike">Day Hike</option>
                    <option value="Multi-day">Multi-day</option>
                    <option value="Summit">Summit</option>
                    <option value="Trail">Trail</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="itinerary-time">Time</Label>
                      <Input
                        id="itinerary-time"
                        value={newItineraryItem.time}
                        onChange={(e) =>
                          setNewItineraryItem({
                            ...newItineraryItem,
                            time: e.target.value,
                          })
                        }
                        placeholder="e.g., 8:00 AM"
                      />
                    </div>
                    <div>
                      <Label htmlFor="itinerary-details">Details</Label>
                      <Textarea
                        id="itinerary-details"
                        value={newItineraryItem.details}
                        onChange={(e) =>
                          setNewItineraryItem({
                            ...newItineraryItem,
                            details: e.target.value,
                          })
                        }
                        placeholder="Activity details"
                        rows={2}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={addItineraryItem}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {itinerary.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-3 rounded border"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-medium text-sm text-blue-600">
                              {item.time}
                            </div>
                            <div className="text-sm mt-1">{item.details}</div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItineraryItem(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inclusive */}
            <Card>
              <CardHeader>
                <CardTitle>What&apos;s Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newInclusiveItem}
                      onChange={(e) => setNewInclusiveItem(e.target.value)}
                      placeholder="Add included item"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addListItem("inclusive"))
                      }
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addListItem("inclusive")}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {inclusive.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded"
                      >
                        <span className="text-sm">{item}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeListItem("inclusive", index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exclusive */}
            <Card>
              <CardHeader>
                <CardTitle>What&apos;s Not Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newExclusiveItem}
                      onChange={(e) => setNewExclusiveItem(e.target.value)}
                      placeholder="Add excluded item"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addListItem("exclusive"))
                      }
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addListItem("exclusive")}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {exclusive.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded"
                      >
                        <span className="text-sm">{item}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeListItem("exclusive", index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || images.length === 0}>
              {isLoading ? "Creating..." : "Create Tour"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
