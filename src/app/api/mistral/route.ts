import { NextResponse } from 'next/server'
import MistralClient, { Message } from '@mistralai/mistralai';

const API_KEY = 'JGPhvJcqUDYnioiItww3viBMNUj0aqP1'

export async function POST(request: Request) {
  const client = new MistralClient(API_KEY);

  const body = await request.json();

  const chatResponse = await client.chat({
    model: 'mistral-large-latest',
    messages: [
      {
        role: 'system',
        content: 'Tu es un assistant médicale. Je vais te donner une conversation entre un patient et notre service de messagerie. Tu dois construire un objet JSON au format { subject : string, resume : string, advice : string }. Le subject est le thème principal de la conversation repris en trois mots, le resume est un résumé de la conversation et le advice est le conseil que vous donneriez à l\'infermière qui va appeller le patient pour savoir comment aborder l\'appel. Ne fourni jamais d\'autre contexte que l\'objet json.',
      },
      {
        role: 'user',
        content: body.message,
      },
    ],
  });

  console.log('Chat:', chatResponse.choices[0].message.content);

  return NextResponse.json({ msg: chatResponse.choices[0].message.content })
}
