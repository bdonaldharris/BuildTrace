import { BuildRecap } from "./types";
import { mockRecap } from "./mock-recap";

export async function generateRecap(rawNotes: string): Promise<BuildRecap> {
  try {
    const res = await fetch("/api/generate-recap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: rawNotes }),
    });

    if (!res.ok) return mockRecap;

    const data = await res.json();
    return data.recap ?? mockRecap;
  } catch {
    return mockRecap;
  }
}
