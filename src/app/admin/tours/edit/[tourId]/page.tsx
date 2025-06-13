"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format, parseISO } from "date-fns";
import { ArrowLeft, Plus, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ItineraryItem {
  time: string;
  details: string;
}

interface Tour {
  id: string;
  tourName: string;
  price: number;
  booking: number;
  images: string[];
  rating: number;
  difficulty: string;
  level: string;
  hikeType: string;
  location: string;
  date: string;
  description: string;
  summary: string;
  itinerary: ItineraryItem[];
  inclusive: string[];
  exclusive: string[];
}

export default function EditTour() {
  const router = useRouter();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingImages, setDeletingImages] = useState<Set<number>>(new Set());

  // Form state
  const [tourName, setTourName] = useState("");
  const [price, setPrice] = useState("");
  const [booking, setBooking] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [rating, setRating] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [level, setLevel] = useState("");
  const [hikeType, setHikeType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>();
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [inclusive, setInclusive] = useState<string[]>([]);
  const [exclusive, setExclusive] = useState<string[]>([]);

  // New item states
  const [newItineraryItem, setNewItineraryItem] = useState<ItineraryItem>({
    time: "",
    details: "",
  });
  const [newInclusiveItem, setNewInclusiveItem] = useState("");
  const [newExclusiveItem, setNewExclusiveItem] = useState("");

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const tourId = window.location.pathname.split("/").pop();
        const response = await fetch(`/api/tours/${tourId}`);
        if (!response.ok) throw new Error("Failed to fetch tour");

        const data = await response.json();
        setTour(data);

        // Populate form fields
        setTourName(data.tourName);
        setPrice(data.price.toString());
        setBooking(data.booking.toString());
        setImages(Array.isArray(data.images) ? data.images : []);
        setRating(data.rating.toString());
        setDifficulty(data.difficulty);
        setLevel(data.level);
        setHikeType(data.hikeType);
        setLocation(data.location);

        // Parse the date string to Date object
        try {
          if (data.date) {
            // Handle different date formats
            const parsedDate = data.date.includes("T")
              ? parseISO(data.date)
              : new Date(data.date);
            setDate(parsedDate);
          }
        } catch (error) {
          console.error("Error parsing date:", error);
          // Fallback to current date if parsing fails
          setDate(new Date());
        }

        setDescription(data.description);
        setSummary(data.summary);
        setItinerary(Array.isArray(data.itinerary) ? data.itinerary : []);
        setInclusive(
          Array.isArray(data.inclusive)
            ? data.inclusive.map((item: { item: string } | string) =>
                typeof item === "string" ? item : item.item
              )
            : []
        );
        setExclusive(
          Array.isArray(data.exclusive)
            ? data.exclusive.map((item: { item: string } | string) =>
                typeof item === "string" ? item : item.item
              )
            : []
        );
      } catch (error) {
        console.error("Error fetching tour:", error);
        toast.error("Failed to load tour data");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "tourName":
        setTourName(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "booking":
        setBooking(value);
        break;
      case "rating":
        setRating(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "summary":
        setSummary(value);
        break;
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        return data.url;
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(`Failed to upload ${file.name}`);
        return null;
      }
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(
        (url): url is string => url !== null
      );

      if (validUrls.length > 0) {
        setImages((prev) => [...prev, ...validUrls]);
        toast.success(`Successfully uploaded ${validUrls.length} image(s)`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
      // Reset the input
      e.target.value = "";
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
        setImages((prev) => prev.filter((_, i) => i !== index));
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

  const addListItem = (type: "itinerary" | "inclusive" | "exclusive") => {
    if (
      type === "itinerary" &&
      newItineraryItem.time.trim() &&
      newItineraryItem.details.trim()
    ) {
      setItinerary([...itinerary, { ...newItineraryItem }]);
      setNewItineraryItem({ time: "", details: "" });
    } else if (type === "inclusive" && newInclusiveItem.trim()) {
      setInclusive([...inclusive, newInclusiveItem.trim()]);
      setNewInclusiveItem("");
    } else if (type === "exclusive" && newExclusiveItem.trim()) {
      setExclusive([...exclusive, newExclusiveItem.trim()]);
      setNewExclusiveItem("");
    }
  };

  const removeListItem = (
    type: "itinerary" | "inclusive" | "exclusive",
    index: number
  ) => {
    if (type === "itinerary") {
      setItinerary(itinerary.filter((_, i) => i !== index));
    } else if (type === "inclusive") {
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

    setSaving(true);

    try {
      const response = await fetch(`/api/tours/${tour?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourName,
          price,
          booking,
          images,
          rating,
          difficulty,
          level,
          hikeType,
          location,
          date: format(date, "yyyy-MM-dd"),
          description,
          summary,
          itinerary,
          inclusive,
          exclusive,
        }),
      });

      if (response.ok) {
        toast.success("Tour updated successfully!");
        router.push("/admin/dashboard");
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to update tour");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold">Edit Tour</h1>
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
                    value={tourName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={location}
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
                    value={price}
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
                    value={booking}
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
                    value={rating}
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
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
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
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
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
                    value={hikeType}
                    onChange={(e) => setHikeType(e.target.value)}
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
                  value={summary}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Lists */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </div>

                  {/* Image Grid */}
                  <div className="grid grid-cols-1 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative group border rounded-lg overflow-hidden bg-gray-50"
                      >
                        <div className="aspect-video relative">
                          <Image
                            src={image}
                            alt={`Tour image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="p-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 truncate">
                              Image {index + 1}
                            </span>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeImage(index)}
                              disabled={deletingImages.has(index)}
                              className="h-8 w-8 p-0"
                            >
                              {deletingImages.has(index) ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {images.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No images uploaded yet</p>
                        <p className="text-sm">
                          Upload at least one image to continue
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newItineraryItem.time}
                      onChange={(e) =>
                        setNewItineraryItem({
                          ...newItineraryItem,
                          time: e.target.value,
                        })
                      }
                      placeholder="Add time"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addListItem("itinerary"))
                      }
                    />
                    <Input
                      value={newItineraryItem.details}
                      onChange={(e) =>
                        setNewItineraryItem({
                          ...newItineraryItem,
                          details: e.target.value,
                        })
                      }
                      placeholder="Add details"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addListItem("itinerary"))
                      }
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addListItem("itinerary")}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {itinerary.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded"
                      >
                        <span className="text-sm">
                          {item.time} - {item.details}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeListItem("itinerary", index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
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
            <Button type="submit" disabled={saving}>
              {saving ? "Updating..." : "Update Tour"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
