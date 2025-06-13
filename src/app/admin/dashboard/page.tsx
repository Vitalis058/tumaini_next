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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
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

        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <h1 className="text-3xl font-bold">Tour Management</h1>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tours
                </CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tours.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active tour packages
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg Rating
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tours.length > 0
                    ? (
                        tours.reduce((sum, tour) => sum + tour.rating, 0) /
                        tours.length
                      ).toFixed(1)
                    : "0"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average tour rating
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Bookings
                </CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tours.reduce((sum, tour) => sum + tour.booking, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Total bookings</p>
              </CardContent>
            </Card>
          </div>

          {/* Tours Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Tours</CardTitle>
              <Button
                onClick={() => router.push("/admin/tours/create")}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add New Tour
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tours.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No tours found. Create your first tour!</p>
                  </div>
                ) : (
                  tours.map((tour) => (
                    <div
                      key={tour.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        {tour.images && tour.images.length > 0 ? (
                          <Image
                            src={tour.images[0]}
                            alt={tour.tourName}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                            <MapPin className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold">{tour.tourName}</h3>
                          <p className="text-sm text-gray-500">
                            {tour.location}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{tour.difficulty}</Badge>
                            <Badge variant="outline">{tour.level}</Badge>
                            <Badge variant="outline">{tour.hikeType}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">${tour.price}</p>
                          <p className="text-sm text-gray-500">
                            {tour.booking} bookings
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{tour.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              router.push(`/admin/tours/edit/${tour.id}`)
                            }
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTour(tour.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
