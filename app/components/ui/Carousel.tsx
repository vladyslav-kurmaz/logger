'use client';

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  items: {
    title: string;
    content: string;
    image?: string;
  }[];
}

export function Carousel({ items }: CarouselProps) {
  const [current, setCurrent] = React.useState(0);

  const next = () => setCurrent((current + 1) % items.length);
  const prev = () => setCurrent((current - 1 + items.length) % items.length);

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <div className="relative h-[400px]">
          {items[current].image && (
            <img
              src={items[current].image}
              alt={items[current].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end text-white">
            <h3 className="text-2xl font-bold mb-2">{items[current].title}</h3>
            <p className="text-sm">{items[current].content}</p>
          </div>
        </div>
      </Card>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2"
        onClick={prev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2"
        onClick={next}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}