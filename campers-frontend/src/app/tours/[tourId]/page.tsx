"use client";

import Image from "next/image";
import { useGetSingleTour } from "@/hooks/apis/tours/useGetSingleTour";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Clock, Users, Star, ArrowLeft } from "lucide-react";

export default function SingleTour() {
  const { tourId } = useParams<{ tourId?: string }>();
  const router = useRouter();

  const { data, isLoading } = useGetSingleTour(tourId!);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-6 animate-pulse">
        <div className="h-80 bg-muted/30 rounded-2xl" />
        <div className="h-8 bg-muted/30 rounded w-2/5" />
        <div className="h-5 bg-muted/30 rounded w-1/2" />
        <div className="h-4 bg-muted/30 rounded w-3/4" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg font-medium text-muted">Tour not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 space-y-16">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-accent font-semibold text-base hover:text-accent/80 transition"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="relative h-96 lg:col-span-2 rounded-3xl overflow-hidden shadow-2xl border border-muted/20 hover:scale-[1.02] transition-transform duration-300">
          <Image
            src={`/images/${data.imageCover}`}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              {data.name}
            </h1>
            <p className="mt-3 text-lg text-muted leading-relaxed">
              {data.summary}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm font-medium text-foreground">
            <div className="flex items-center gap-3 border rounded-lg p-4 shadow-sm bg-surface border-muted/20">
              <Clock size={20} className="text-accent" />
              <span>{data.duration} days</span>
            </div>
            <div className="flex items-center gap-3 border rounded-lg p-4 shadow-sm bg-surface border-muted/20">
              <Users size={20} className="text-accent" />
              <span>{data.maxGroupSize} people</span>
            </div>
            <div className="flex items-center gap-3 border rounded-lg p-4 shadow-sm bg-surface border-muted/20">
              <Star size={20} className="text-accent" />
              <span>{data.ratingsAverage.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-3 border rounded-lg p-4 shadow-sm bg-surface border-muted/20 text-lg font-bold text-foreground justify-center">
              ${data.price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Locations */}
      <section className="space-y-5">
        <h2 className="text-3xl font-semibold text-foreground border-b border-muted/30 pb-2">
          Locations
        </h2>
        <ul className="space-y-4">
          {data.locations.map((loc) => (
            <li
              key={loc._id}
              className="flex items-center gap-4 text-base text-foreground bg-surface p-5 rounded-2xl shadow-md border border-muted/25 hover:shadow-lg transition-shadow cursor-default"
            >
              <MapPin size={22} className="text-accent" />
              <span>
                <span className="font-semibold">Day {loc.day}:</span>{" "}
                {loc.description}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Start Dates */}
      <section>
        <h2 className="text-3xl font-semibold text-foreground mb-4 border-b border-muted/30 pb-2">
          Start Dates
        </h2>
        <div className="flex flex-wrap gap-3">
          {data.startDates.map((date, idx) => (
            <span
              key={idx}
              className="inline-block px-5 py-2 rounded-full bg-accent/15 text-accent font-semibold text-sm cursor-default select-none shadow-sm"
              title={new Date(date).toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            >
              {new Date(date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="space-y-4 max-w-4xl">
        <h2 className="text-3xl font-semibold text-foreground border-b border-muted/30 pb-2">
          About this Tour
        </h2>
        <p className="text-lg text-muted leading-relaxed">{data.description}</p>
      </section>

      {/* Reviews */}
      <section className="space-y-6 max-w-4xl">
        <h2 className="text-3xl font-semibold text-foreground border-b border-muted/30 pb-2">
          Reviews
        </h2>
        {data.reviews.length === 0 ? (
          <p className="text-muted italic text-lg">
            No reviews yet for this tour.
          </p>
        ) : (
          <div className="space-y-5">
            {data.reviews.map((review) => (
              <div
                key={review._id}
                className="flex gap-5 p-5 border border-muted/30 rounded-2xl bg-surface shadow-md hover:shadow-lg transition-shadow"
              >
                {review.user?.photo ? (
                  <div className="w-14 h-14 relative rounded-full overflow-hidden flex-shrink-0 shadow-md">
                    <Image
                      src={`/users/${review.user.photo}`}
                      alt={review.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-foreground font-semibold text-xl">
                    {review.user?.name?.[0].toUpperCase() || "A"}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-lg text-foreground">
                      {review.user?.name || "Anonymous"}
                    </span>
                    <div className="flex items-center gap-1 text-accent font-semibold">
                      <Star size={16} />
                      <span>{review.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-md text-muted leading-relaxed">
                    {review.review}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
