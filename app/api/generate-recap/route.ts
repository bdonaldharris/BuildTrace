import { NextRequest, NextResponse } from "next/server";
import { mockRecap } from "@/lib/mock-recap";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ recap: mockRecap });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(notes) },
        ],
        temperature: 0.4,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ recap: mockRecap });
    }

    const data = await response.json();
    const raw: string = data.choices?.[0]?.message?.content ?? "";

    // Strip markdown code block wrappers if present
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const recap = JSON.parse(cleaned);
    return NextResponse.json({ recap });
  } catch {
    return NextResponse.json({ recap: mockRecap });
  }
}
