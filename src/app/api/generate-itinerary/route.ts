import { NextResponse } from "next/server";
import { generateFallbackItinerary } from "@/data/cached-itineraries";
import { TripItinerary } from "@/lib/schemas/itinerary";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { destination, durationDays, budgetTier, travelStyle } = body;

    const targetDestination = destination || "Jaipur";
    const targetDays = Number(durationDays) || 3;
    const targetBudget = budgetTier || "Moderate";
    const targetStyle = travelStyle || "Couple";

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey) {
      try {
        const prompt = `You are an expert Indian travel concierge creating a realistic, authentic, and detailed ${targetDays}-day trip itinerary for ${targetDestination}, India.
Budget Tier: ${targetBudget}
Travel Style: ${targetStyle}

Return ONLY a valid JSON object strictly adhering to this structure without markdown formatting or surrounding text:
{
  "tripTitle": "Catchy Title",
  "destination": "${targetDestination}",
  "durationDays": ${targetDays},
  "budgetTier": "${targetBudget}",
  "travelStyle": "${targetStyle}",
  "totalEstimatedCostINR": 25000,
  "packingTips": ["Tip 1", "Tip 2", "Tip 3"],
  "dailyItinerary": [
    {
      "dayNumber": 1,
      "theme": "Day Theme",
      "locationName": "Main Landmark or Area",
      "lat": 26.9124,
      "lng": 75.7873,
      "activities": {
        "morning": { "name": "Activity Name", "description": "Short vivid description", "location": "Spot Name", "timeSlot": "09:00 AM - 12:00 PM" },
        "afternoon": { "name": "Activity Name", "description": "Short vivid description", "location": "Spot Name", "timeSlot": "01:30 PM - 04:00 PM" },
        "evening": { "name": "Activity Name", "description": "Short vivid description", "location": "Spot Name", "timeSlot": "05:30 PM - 08:00 PM" }
      },
      "food": [
        { "meal": "Breakfast", "suggestion": "Specific authentic dish & restaurant", "cuisine": "Cuisine Type" },
        { "meal": "Lunch", "suggestion": "Specific authentic dish & restaurant", "cuisine": "Cuisine Type" },
        { "meal": "Dinner", "suggestion": "Specific authentic dish & restaurant", "cuisine": "Cuisine Type" }
      ],
      "stay": "Specific hotel or resort recommendation matching budget tier",
      "transportTip": "Realistic local transport advice",
      "estimatedCostINR": 8000
    }
  ]
}`;

        // Attempt models in order: gemini-1.5-flash -> gemini-2.0-flash -> gemini-1.5-pro
        const models = [
          "gemini-1.5-flash",
          "gemini-2.0-flash",
          "gemini-1.5-pro",
        ];

        for (const model of models) {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
              }),
            }
          );

          if (res.ok) {
            const data = await res.json();
            const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (rawText) {
              const cleanText = rawText
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim();
              const parsed = JSON.parse(cleanText) as TripItinerary;
              return NextResponse.json(parsed);
            }
          }
        }
      } catch (err) {
        console.warn("External API call failed, falling back to cached itinerary", err);
      }
    }

    // Fallback response if no key or API fail
    const fallback = generateFallbackItinerary(
      targetDestination,
      targetDays,
      targetBudget,
      targetStyle
    );

    return NextResponse.json(fallback);
  } catch (error) {
    console.error("API generate-itinerary error:", error);
    const defaultFallback = generateFallbackItinerary("Jaipur", 3, "Moderate", "Couple");
    return NextResponse.json(defaultFallback);
  }
}

