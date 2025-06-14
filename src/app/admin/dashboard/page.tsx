"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Edit,
  Home,
  LogOut,
  MapPin,
  Plus,
  Settings,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Admin {
  id: string;
  email: string;
  name: string;
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
  createdAt: string;
  updatedAt: string;
  inclusive?: string[];
  exclusive?: string[];
}

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Tours",
    url: "/admin/tours",
    icon: MapPin,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

// Format price in KSH
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(price);
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verify admin
        const adminResponse = await fetch("/api/admin/verify");
        if (adminResponse.ok) {
          const adminData = await adminResponse.json();
          setAdmin(adminData.admin);
        } else {
          router.push("/admin/login");
          return;
        }

        // Fetch tours
        const toursResponse = await fetch("/api/tours");
        if (toursResponse.ok) {
          const toursData = await toursResponse.json();
          setTours(toursData);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error loading dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (response.ok) {
        toast.success("Logged out successfully");
        router.push("/admin/login");
      } else {
        toast.error("Logout failed");
      }
    } catch {
      toast.error("Logout error");
    }
  };

  const handleDeleteTour = async (tourId: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) {
      return;
    }

    try {
      const response = await fetch(`/api/tours/${tourId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Tour deleted successfully");
        setTours(tours.filter((tour) => tour.id !== tourId));
      } else {
        toast.error("Failed to delete tour");
      }
    } catch {
      toast.error("Error deleting tour");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        {/* Sidebar */}
        <Sidebar className="hidden lg:block">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <MapPin className="h-6 w-6 text-green-600" />
              <span className="font-bold text-lg">Tumaini Admin</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {admin.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{admin.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {admin.email}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-x-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Tour Management
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your hiking tours and bookings
                </p>
              </div>
            </div>
            <div className="sm:ml-auto">
              <Button
                onClick={() => router.push("/admin/tours/create")}
                className="w-full sm:w-auto flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add New Tour</span>
                <span className="sm:hidden">Add Tour</span>
              </Button>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Tours
                </CardTitle>
                <MapPin className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {tours.length}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Active tour packages
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Avg Rating
                </CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {tours.length > 0
                    ? (
                        tours.reduce((sum, tour) => sum + tour.rating, 0) /
                        tours.length
                      ).toFixed(1)
                    : "0"}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Average tour rating
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tours Management */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  All Tours
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your tour listings
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {tours.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No tours found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Get started by creating your first tour!
                    </p>
                    <Button
                      onClick={() => router.push("/admin/tours/create")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Tour
                    </Button>
                  </div>
                ) : (
                  tours.map((tour) => (
                    <div
                      key={tour.id}
                      className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Tour Image and Basic Info */}
                        <div className="flex items-start gap-4 flex-1">
                          {tour.images && tour.images.length > 0 ? (
                            <Image
                              src={tour.images[0]}
                              alt={tour.tourName}
                              width={80}
                              height={80}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                              <MapPin className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                              {tour.tourName}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">
                              {tour.location}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatDate(tour.date)}
                            </p>
                            <div className="flex flex-wrap items-center gap-1 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {tour.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {tour.level}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {tour.hikeType}
                              </Badge>
                            </div>

                            {/* Inclusive and Exclusive Features */}
                            <div className="mt-3 space-y-2">
                              {tour.inclusive && tour.inclusive.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-green-700 mb-1">
                                    Included:
                                  </p>
                                  <div className="flex flex-wrap gap-1">
                                    {tour.inclusive
                                      .slice(0, 3)
                                      .map((item, index) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="text-xs bg-green-50 text-green-700 border-green-200"
                                        >
                                          ✓ {item}
                                        </Badge>
                                      ))}
                                    {tour.inclusive.length > 3 && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs bg-green-50 text-green-700 border-green-200"
                                      >
                                        +{tour.inclusive.length - 3} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )}

                              {tour.exclusive && tour.exclusive.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-red-700 mb-1">
                                    Excluded:
                                  </p>
                                  <div className="flex flex-wrap gap-1">
                                    {tour.exclusive
                                      .slice(0, 2)
                                      .map((item, index) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="text-xs bg-red-50 text-red-700 border-red-200"
                                        >
                                          ✗ {item}
                                        </Badge>
                                      ))}
                                    {tour.exclusive.length > 2 && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs bg-red-50 text-red-700 border-red-200"
                                      >
                                        +{tour.exclusive.length - 2} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Stats and Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-4 sm:gap-6 text-center">
                            <div>
                              <p className="text-lg sm:text-xl font-bold text-gray-900">
                                {formatPrice(tour.price)}
                              </p>
                              <p className="text-xs text-gray-500">Price</p>
                            </div>
                            <div>
                              <div className="flex items-center justify-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-lg sm:text-xl font-bold text-gray-900">
                                  {tour.rating}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">Rating</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                router.push(`/admin/tours/edit/${tour.id}`)
                              }
                              className="flex-1 sm:flex-none"
                            >
                              <Edit className="h-4 w-4 sm:mr-2" />
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteTour(tour.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-1 sm:flex-none"
                            >
                              <Trash2 className="h-4 w-4 sm:mr-2" />
                              <span className="hidden sm:inline">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
}
