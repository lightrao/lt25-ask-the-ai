import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI();

// Set the OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API key");
}
openai.apiKey = process.env.OPENAI_API_KEY;

// Handle GET requests
export async function POST(request: NextRequest) {
  // Check if the request has a valid JSON body
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return new NextResponse("Invalid content type", { status: 400 });
  }

  try {
    // Parse the JSON body to extract the 'query' property
    const requestBody = await request.json();
    const { query } = requestBody; // Extract the 'query' property

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: query,
        },
      ],
    });

    console.log(completion.choices[0].message);

    // Return a JSON response with the 'response' property set to the value of 'query'
    const responseObj = { response: completion.choices[0].message.content };
    return new NextResponse(JSON.stringify(responseObj), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Invalid JSON data", { status: 400 });
  }
}
