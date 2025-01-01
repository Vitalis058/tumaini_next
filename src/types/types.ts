export interface Tour {
  id: string;
  tourName: string;
  price: number;
  booking: number;
  imageUrl: string;
  rating: number;
  difficulty: string;
  level: string;
  hikeType: string;
  location: string;
  date: string;
  description: string;
  summary: string;
  itinerary: ItineraryItem[];
  inclusive: InclusiveItem[];
  exclusive: ExclusiveItem[];
  createdAt: string;
  updatedAt: string; // Date string in ISO format
}

interface ItineraryItem {
  day: string;
  details: string;
}

interface InclusiveItem {
  item: string;
}

interface ExclusiveItem {
  item: string;
}
