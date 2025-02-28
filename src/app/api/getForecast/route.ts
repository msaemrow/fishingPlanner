import axios from "axios";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat) {
    return NextResponse.json(
      { message: "Please provide a latitude" },
      { status: 400 }
    );
  }

  if (!lon) {
    return NextResponse.json(
      { message: "Please provide a longitude" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${process.env.WEATHER_KEY}&units=imperial`
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
