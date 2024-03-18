import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest | Request) {
  try {
    const apiKey = process.env.NEXT_OPENWEATHER;

    const nextReq = req as NextRequest;

    let lat = "";
    let lon = "";
    if (nextReq instanceof NextRequest) {
      const searchParams = nextReq.nextUrl.searchParams;
      lat = searchParams.get("lat") || "";
      lon = searchParams.get("lon") || "";
    } else {
      const queryParams = new URLSearchParams(
        (nextReq as Request).url.split("?")[1]
      );
      lat = queryParams.get("lat") || "";
      lon = queryParams.get("lon") || "";
    }

    if (!lat || !lon) {
      throw new Error("Latitude or longitude not provided in query parameters");
    }

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error in getting pollution data:", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}
