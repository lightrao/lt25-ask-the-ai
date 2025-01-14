import { NextRequest, NextResponse } from 'next/server';

// Handle GET requests
export async function POST(request: NextRequest) {
  // Check if the request has a valid JSON body
  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return new NextResponse('Invalid content type', { status: 400 });
  }

  try {
    // Parse the JSON body to extract the 'query' property
    const requestBody = await request.json();
    const { query } = requestBody; // Extract the 'query' property

    // Return a JSON response with the 'response' property set to the value of 'query'
    const responseObj = { response: query };
    return new NextResponse(JSON.stringify(responseObj), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Invalid JSON data', { status: 400 });
  }
}
