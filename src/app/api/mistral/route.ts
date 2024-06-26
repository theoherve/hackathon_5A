import { NextResponse } from 'next/server'
import MistralClient from '@mistralai/mistralai';

export async function POST(request: Request) {
  const client = new MistralClient(process.env.MISTRAL_API_KEY);

  const body = await request.json();

  const chatResponse = await client.chat({
    model: 'mistral-large-latest',
    messages: [
      {
        role: 'system',
        content: 'Tu es un assistant médicale. Je vais te donner une conversation entre un patient et notre service de messagerie. Tu dois construire un objet JSON au format { subject : string, resume : string, advices : string[] }. Le subject est le thème principal de la conversation repris en trois mots, le resume est un résumé de la conversation et le advices est le conseil que vous donneriez à l\'infermière qui va appeller le patient pour savoir comment aborder l\'appel (c\'est un tableau de string donc il faut bien le découpé). Ne fourni jamais d\'autre contexte que l\'objet json.',
      },
      {
        role: 'user',
        content: JSON.stringify(body.message),
      },
    ],
  });  
  
  return NextResponse.json({ msg: JSON.parse(chatResponse.choices[0].message.content) })
}
