import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest | Request) {
  try {
    const apiKey = process.env.NEXT_OPENWEATHER;

    // Type assertion to narrow down the type to NextRequest
    const nextReq = req as NextRequest;

    // Check if req is a NextRequest
    if ("nextUrl" in nextReq) {
      const searchParams = nextReq.nextUrl.searchParams;
      const lat = searchParams.get("lat");
      const lon = searchParams.get("lon");

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      const res = await axios.get(url);

      return NextResponse.json(res.data);
    } else {
      throw new Error("Expected NextRequest but received Request");
    }
  } catch (error) {
    console.log("Error fetching forecast data:", error);
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
