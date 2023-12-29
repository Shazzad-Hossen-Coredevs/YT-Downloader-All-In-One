import ytdl from "ytdl-core";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get('url');
    const videoInfo = await ytdl.getInfo(videoUrl);
    return NextResponse.json(videoInfo);
}