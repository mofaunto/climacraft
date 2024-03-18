import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest | Request) {
  try {
    const apiKey = process.env.NEXT_OPENWEATHER;
    const lat = 37.5519;
    const lon = 126.9918;

    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const dailyRes = await fetch(dailyUrl, {
      next: { revalidate: 3600 },
    });

    const dailyData = await dailyRes.json();

    return NextResponse.json(dailyData);
  } catch (error) {
    console.log("Error in getting daily data ");
    return new Response("Error in getting daily data ", { status: 500 });
  }
}
