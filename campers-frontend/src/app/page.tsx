"use client";

import CampCard from "@/components/cards/CampCard";
import { useGetTours } from "@/hooks/apis/tours/useGetTours";
import CampCardSkeleton from "@/components/cards/CampCardSkeleton";

export default function Home() {
  const { data: tourData, isLoading } = useGetTours();

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isLoading ? (
          <CampCardSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourData?.map((tour) => (
              <CampCard
                key={tour.id}
                id={tour._id}
                name={tour.name}
                summary={tour.summary}
                duration={tour.duration}
                maxGroupSize={tour.maxGroupSize}
                ratingsAverage={tour.ratingsAverage}
                price={tour.price}
                startLocation={tour.startLocation}
                imageCover={tour.imageCover}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
