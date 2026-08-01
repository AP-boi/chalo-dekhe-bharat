export interface ActivityItem {
  name: string;
  description: string;
  location: string;
  timeSlot?: string;
}

export interface MealSuggestion {
  meal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  suggestion: string;
  cuisine: string;
}

export interface DayItinerary {
  dayNumber: number;
  theme: string;
  locationName: string;
  lat: number;
  lng: number;
  activities: {
    morning: ActivityItem;
    afternoon: ActivityItem;
    evening: ActivityItem;
  };
  food: MealSuggestion[];
  stay: string;
  transportTip: string;
  estimatedCostINR: number;
}

export interface TripItinerary {
  tripTitle: string;
  destination: string;
  durationDays: number;
  budgetTier: 'Budget' | 'Moderate' | 'Luxury';
  travelStyle: 'Solo' | 'Couple' | 'Family' | 'Friends';
  dailyItinerary: DayItinerary[];
  totalEstimatedCostINR: number;
  packingTips: string[];
}
