import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest | Request) {
  try {
    const nextReq = req as NextRequest;

    let city = "";
    if (nextReq instanceof NextRequest) {
      const searchParams = nextReq.nextUrl.searchParams;
      city = searchParams.get("search") || "";
    } else {
      const queryParams = new URLSearchParams(
        (nextReq as Request).url.split("?")[1]
      );
      city = queryParams.get("search") || "";
    }

    if (!city) {
      throw new Error("City not provided in query parameters");
    }

    const apiKey = process.env.NEXT_OPENWEATHER;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching geocoded data:", error);
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}
