"use client";

import BrowseTourCard from "@/components/tours/BrowseTourCard";
import BrowseTourSkeleton from "@/components/tours/BrowseTourSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tour } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Filter, Mountain, Search } from "lucide-react";
import { useMemo, useState } from "react";

interface Filters {
  search: string;
  difficulty: string;
  level: string;
  hikeType: string;
  priceRange: string;
  sortBy: string;
}

interface ToursClientProps {
  initialTours: Tour[];
}

const ToursClient = ({ initialTours }: ToursClientProps) => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    difficulty: "",
    level: "",
    hikeType: "",
    priceRange: "",
    sortBy: "newest",
  });

  const { data: tours = initialTours, isLoading } = useQuery({
    queryKey: ["fetching-tours"],
    queryFn: async () => {
      const response = await axios.get("/api/tours");
      return response.data as Tour[];
    },
    initialData: initialTours,
    staleTime: 30 * 1000, // 30 seconds instead of 5 minutes
    refetchInterval: 60 * 1000, // Refetch every minute
    refetchOnWindowFocus: true, // Refetch when user returns to tab
    refetchOnMount: true, // Always refetch on component mount
  });

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    const filtered = tours.filter((tour) => {
      const matchesSearch =
        tour.tourName.toLowerCase().includes(filters.search.toLowerCase()) ||
        tour.location.toLowerCase().includes(filters.search.toLowerCase());

      const matchesDifficulty =
        !filters.difficulty || tour.difficulty === filters.difficulty;
      const matchesLevel = !filters.level || tour.level === filters.level;
      const matchesHikeType =
        !filters.hikeType || tour.hikeType === filters.hikeType;

      let matchesPrice = true;
      if (filters.priceRange) {
        const price = tour.price;
        switch (filters.priceRange) {
          case "0-5000":
            matchesPrice = price <= 5000;
            break;
          case "5000-15000":
            matchesPrice = price > 5000 && price <= 15000;
            break;
          case "15000-30000":
            matchesPrice = price > 15000 && price <= 30000;
            break;
          case "30000+":
            matchesPrice = price > 30000;
            break;
        }
      }

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesLevel &&
        matchesHikeType &&
        matchesPrice
      );
    });

    // Sort tours
    switch (filters.sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "date":
        return filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      default:
        return filtered.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
    }
  }, [tours, filters]);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      difficulty: "",
      level: "",
      hikeType: "",
      priceRange: "",
      sortBy: "newest",
    });
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== "" && value !== "newest"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium py-2 px-3 bg-primary/50 rounded-full w-fit mx-auto">
                Discover Kenya&apos;s Best Hiking Adventures
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Explore Our
                <span className="text-primary block">Adventure Tours</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From beginner-friendly trails to challenging summit expeditions,
                discover Kenya&apos;s most spectacular landscapes with our
                expert guides.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {tours.length}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Tours Available
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">
                  Average Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Hikers
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tours or locations..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10"
                aria-label="Search tours"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-2">
              <Select
                value={filters.sortBy}
                onValueChange={(value: string) => updateFilter("sortBy", value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="date">By Date</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs"
                      >
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Tours</SheetTitle>
                    <SheetDescription>
                      Narrow down your search to find the perfect adventure.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Difficulty
                      </label>
                      <Select
                        value={filters.difficulty}
                        onValueChange={(value: string) =>
                          updateFilter("difficulty", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any difficulty</SelectItem>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="challenging">
                            Challenging
                          </SelectItem>
                          <SelectItem value="strenuous">Strenuous</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Experience Level
                      </label>
                      <Select
                        value={filters.level}
                        onValueChange={(value: string) =>
                          updateFilter("level", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any level</SelectItem>
                          <SelectItem value="child-friendly">
                            Child Friendly
                          </SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Hike Type
                      </label>
                      <Select
                        value={filters.hikeType}
                        onValueChange={(value: string) =>
                          updateFilter("hikeType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any type</SelectItem>
                          <SelectItem value="day-hike">Day Hike</SelectItem>
                          <SelectItem value="multi-day-hike">
                            Multi-day Hike
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Price Range (KES)
                      </label>
                      <Select
                        value={filters.priceRange}
                        onValueChange={(value: string) =>
                          updateFilter("priceRange", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any price</SelectItem>
                          <SelectItem value="0-5000">Under 5,000</SelectItem>
                          <SelectItem value="5000-15000">
                            5,000 - 15,000
                          </SelectItem>
                          <SelectItem value="15000-30000">
                            15,000 - 30,000
                          </SelectItem>
                          <SelectItem value="30000+">30,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="w-full"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {isLoading
                ? "Loading tours..."
                : `${filteredTours.length} Tours Found`}
            </h2>
            {filters.search && (
              <p className="text-muted-foreground mt-1">
                Showing results for &quot;{filters.search}&quot;
              </p>
            )}
          </div>

          {activeFiltersCount > 0 && (
            <Button onClick={clearFilters} variant="ghost" size="sm">
              Clear filters ({activeFiltersCount})
            </Button>
          )}
        </div>

        {/* Tours Grid */}
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <BrowseTourSkeleton key={i} />
            ))}
          </div>
        ) : filteredTours.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent className="space-y-4">
              <Mountain className="w-16 h-16 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-xl font-semibold mb-2">No tours found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters to find more
                  tours.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <section className="space-y-6" aria-label="Tour listings">
            {filteredTours.map((tour) => (
              <BrowseTourCard key={tour.id} tour={tour} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default ToursClient;
