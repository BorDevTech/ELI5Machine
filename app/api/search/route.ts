import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = process.env.GAPIKey;
  const query = request.nextUrl.searchParams.get("q");
  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${encodeURIComponent(
    query
  )}&key=${token}`;

  console.log("Received query:", query);

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (fallbackError) {
    return NextResponse.json({
      ok: false,
      error:
        fallbackError instanceof Error
          ? fallbackError.message
          : `Failed to fetch data`,
      status: 500,
    });
  }
}
