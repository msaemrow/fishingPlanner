import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Extract search parameters from the request URL
  const searchParams = request.nextUrl.searchParams;
  const zipCode = searchParams.get("zip");

  if (!zipCode) {
    return NextResponse.json(
      { message: "Please provide a zip code" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${process.env.WEATHER_KEY}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting location data" },
      { status: 500 }
    );
  }
}
