import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest | Request) {
  try {
    const apiKey = process.env.NEXT_OPENWEATHER;
    const nextReq = req as NextRequest;

    if ("nextUrl" in nextReq) {
      const searchParams = nextReq.nextUrl.searchParams;

      const lat = searchParams.get("lat");
      const lon = searchParams.get("lon");

      const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      const dailyRes = await fetch(dailyUrl, {
        next: { revalidate: 3600 },
      });

      const dailyData = await dailyRes.json();

      return NextResponse.json(dailyData);
    } else {
      throw new Error("Expected NextRequest but received Request");
    }
  } catch (error) {
    console.log("Error in getting daily data ", error);
    return new Response("Error in getting daily data ", { status: 500 });
  }
}
