import fs from "fs";
import OpenAI from "openai";
import { NextResponse } from 'next/server'
import MistralClient from '@mistralai/mistralai';
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const mistral = new MistralClient(process.env.MISTRAL_API_KEY);

export async function POST(request: Request) {

  const body = await request.json();

  const filePath = path.join(process.cwd(), 'public', body.path);

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: "whisper-1",
  });

  const chatResponse = await mistral.chat({
    model: 'mistral-large-latest',
    messages: [
      {
        role: 'system',
        content: 'Tu es un assistant médicale. Je vais te donner une conversation en texte brute entre un patient et le service de messagerie. Tu dois construire tableau d\'objet JSON. Si le premier à entamer le dialogue est l\'infirmier alors l\'objet JSON est au format {Infirmier : string, Patient: string }, sinon si c\'est le patient qui entame la conversation alors le l\'objet JSON est au format {Patient : string, Infirmier: string }. Donc chaque objet JSON est une ligne de dialogue en string et la réponse à cette ligne de dialogue en string. Ne fournis jamais d\'autre contexte que le tableau d\'objet JSON.',
      },
      {
        role: 'user',
        content: JSON.stringify(transcription.text),
      },
    ],
  });  

  return NextResponse.json({ msg: JSON.parse(chatResponse.choices[0].message.content) })
}