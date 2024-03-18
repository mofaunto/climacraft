import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest | Request) {
  try {
    const apiKey = process.env.NEXT_OPENWEATHER;
    const nextReq = req as NextRequest;

    if ("nextUrl" in nextReq) {
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
        throw new Error(
          "Latitude or longitude not provided in query parameters"
        );
      }

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
    console.log("Error in getting daily data:", error);
    return new Response("Error in getting daily data", { status: 500 });
  }
}
