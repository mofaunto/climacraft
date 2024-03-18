import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest | Request) {
  try {
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

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(url, {
      next: { revalidate: 900 },
    });

    const uvData = await res.json();

    return NextResponse.json(uvData);
  } catch (error) {
    console.log("Error getting UV data:", error);
    return new Response("Error getting UV data", { status: 500 });
  }
}
