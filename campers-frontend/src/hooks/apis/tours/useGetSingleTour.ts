// hooks/useGetSingleTour.ts

"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getWithoutAuth } from "@/configs/axiosConfigs";

// Types for nested fields
type Location = {
  type: "Point";
  coordinates: [number, number];
  description: string;
  day: number;
  _id: string;
  id: string;
};

type Guide = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
};

type Review = {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  tour: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  __v: number;
  id: string;
};

// Full tour type
export type Tour = {
  _id: string;
  id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  createdAt: string;
  startDates: string[];
  secretTour: boolean;
  startLocation: {
    type: "Point";
    coordinates: [number, number];
    address: string;
    description: string;
  };
  locations: Location[];
  guides: Guide[];
  slug: string;
  __v: number;
  durationWeeks: number;
  reviews: Review[];
};

// API response structure
type SingleTourResponse = {
  status: string;
  body: Tour;
};

// ✅ The hook
export function useGetSingleTour(tourId: string): UseQueryResult<Tour, Error> {
  return useQuery({
    queryKey: ["tour", tourId],
    queryFn: async () => {
      const res = await getWithoutAuth<SingleTourResponse>(
        `api/v1/tours/${tourId}`
      );
      return res.data.body;
    },
    enabled: !!tourId, // Prevents query from running if no ID
  });
}
