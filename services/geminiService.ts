
import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const itinerarySchema = {
    type: Type.OBJECT,
    properties: {
        destination: { type: Type.STRING },
        duration: { type: Type.INTEGER },
        tripTitle: { type: Type.STRING },
        dailyPlans: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    activities: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                time: { type: Type.STRING },
                                description: { type: Type.STRING },
                                location: { type: Type.STRING },
                            },
                        },
                    },
                    foodSuggestions: {
                        type: Type.OBJECT,
                        properties: {
                            breakfast: { type: Type.STRING },
                            lunch: { type: Type.STRING },
                            dinner: { type: Type.STRING },
                        },
                    },
                },
            },
        },
    },
};

export const generateItinerary = async (destination: string, duration: string, interests: string, budget: string): Promise<Itinerary> => {
  const prompt = `
    Create a detailed travel itinerary for a trip to ${destination} for ${duration} days.
    The traveler's interests are: ${interests}.
    The budget for the trip is ${budget}.
    
    Please provide a creative and engaging title for the trip.
    For each day, provide a thematic title, a list of activities with suggested times (e.g., Morning, Afternoon, Evening) and locations,
    and specific suggestions for breakfast, lunch, and dinner that fit the budget and local cuisine.
    Ensure the itinerary is logical, well-paced, and full of interesting suggestions.
    Do not include any introductory or concluding text, only the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: itinerarySchema,
        },
    });

    const responseText = response.text.trim();
    // Sometimes the model might wrap the JSON in markdown backticks
    const cleanedJsonString = responseText.replace(/^```json\s*|```$/g, '');
    const parsedItinerary = JSON.parse(cleanedJsonString);

    return parsedItinerary as Itinerary;

  } catch (error) {
    console.error("Error generating itinerary with Gemini:", error);
    throw new Error("Failed to parse itinerary from Gemini response.");
  }
};
