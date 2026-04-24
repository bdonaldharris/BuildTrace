"use client";

import { Button } from "@/components/ui/button";

interface SampleLoaderProps {
  onLoad: () => void;
}

export default function SampleLoader({ onLoad }: SampleLoaderProps) {
  return (
    <Button variant="outline" size="sm" onClick={onLoad}>
      Load Sample Session
    </Button>
  );
}
