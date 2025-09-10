
export interface Activity {
  time: string;
  description: string;
  location?: string;
}

export interface FoodSuggestions {
  breakfast?: string;
  lunch?: string;
  dinner?: string;
}

export interface DayPlan {
  day: number;
  title: string;
  activities: Activity[];
  foodSuggestions: FoodSuggestions;
}

export interface Itinerary {
  destination: string;
  duration: number;
  tripTitle: string;
  dailyPlans: DayPlan[];
}
