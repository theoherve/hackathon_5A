import fs from "fs";
import OpenAI from "openai";
import { NextResponse } from 'next/server'
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {

  const body = await request.json();

  const filePath = path.join(process.cwd(), 'public', body.path);

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: "whisper-1",
  });

  return NextResponse.json({ msg: transcription.text })
}