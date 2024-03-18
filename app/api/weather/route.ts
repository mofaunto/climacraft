import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest | Request) {
  try {
    const apiKey = process.env.NEXT_OPENWEATHER;
    const lat = 37.5519;
    const lon = 126.9918;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching forecast data");
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
