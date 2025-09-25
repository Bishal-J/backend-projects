"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getWithoutAuth } from "@/configs/axiosConfigs";

// ✅ Define the inner shape of the response only
type ApiResponse<T> = {
  body: T;
  message: string;
  status: string;
};

// ✅ Define the Tour structure
type Tour = {
  _id: string;
  id: string;
  name: string;
  slug: string;
  duration: number;
  durationWeeks: number;
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
  startLocation?: {
    type: string;
    coordinates: number[];
    address: string;
    description: string;
  };
  locations: Array<{
    type: string;
    coordinates: number[];
    description: string;
    day: number;
    _id: string;
    id: string;
  }>;
  guides: string[];
  reviews: Array<{
    _id: string;
    id: string;
    review: string;
    rating: number;
    createdAt: string;
    tour: string;
    user: string;
    __v: number;
  }>;
};

// ✅ Now use the correct type here
export function useGetTours(): UseQueryResult<Tour[], Error> {
  return useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const res = await getWithoutAuth<ApiResponse<Tour[]>>("api/v1/tours");
      return res.data.body; // ✅ valid now
    },
  });
}
