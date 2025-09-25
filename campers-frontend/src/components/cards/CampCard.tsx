"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Users, Star } from "lucide-react";

// ✅ Reusable type for card-sized tour data
export type TourCardData = {
  id: string;
  name: string;
  summary: string;
  duration: number;
  maxGroupSize: number;
  ratingsAverage: number;
  price: number;
  startLocation:
    | {
        description: string;
      }
    | undefined;
  imageCover: string;
};

export default function CampCard({
  id,
  name,
  summary,
  duration,
  maxGroupSize,
  ratingsAverage,
  price,
  startLocation,
  imageCover,
}: TourCardData) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-md border border-muted/30 bg-surface hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative h-52 w-full">
        <Image
          src={`/images/${imageCover}`}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted line-clamp-2">{summary}</p>

          <div className="grid grid-cols-2 gap-3 text-sm text-foreground mt-3">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              <span>{startLocation?.description}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-accent" />
              <span>{duration} days</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-accent" />
              <span>{maxGroupSize} people</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-accent" />
              <span>{ratingsAverage.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5 border-t border-muted/30 pt-4">
          <span className="text-lg font-bold text-foreground">
            ${price.toLocaleString()}
          </span>
          <Link
            href={`/tours/${id}`}
            className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-xl shadow transition hover:bg-[var(--accent)]/80"
          >
            View Tour
          </Link>
        </div>
      </div>
    </div>
  );
}
