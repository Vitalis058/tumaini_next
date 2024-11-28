export type TourType = {
  id: number;
  name: string;
  price: number;
  rating: number;
  difficulty: string;
  hikeType: string;
  location: string;
  country: string;
  summary: string;
  description: string;
  level: string;
  date: string;
  imageUrl: string;
  slug: string;
  booking: number;
  active: boolean;
  itinerary: {
    day: string;
    details: string;
  }[];
  inclusive: {
    item: string;
  }[];
  exclusive: {
    item: string;
  }[];
};
