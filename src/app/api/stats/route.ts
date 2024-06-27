import MistralClient from "@mistralai/mistralai";
import { NextResponse } from "next/server";

const API_KEY = "JGPhvJcqUDYnioiItww3viBMNUj0aqP1";

export async function POST(request: Request) {
  const client = new MistralClient(API_KEY);

  const body = await request.json();

  const content = `Je te donne cette liste de catégories : ${body.categories.map((value: string) => value)}.
          Je vais te donner un JSON, avec un tableau contenant des message de clients dans le milieu de la santé. 
          Peux tu analyser le message pour me dire si le message parle d'une des catégories, 
          et noter cette catégorie. Je veux que tu me retourne le résultat sous forme de JSON, 
          avec comme clefs chaque categories, et en valeur un tableau avec deux valeurs, 
          le nombre de retour positif et negitif. Si une réponse n'indique rien de spécial, 
          fait une catégorie spéciale nommé 'none' pour ce qui ne rentre dans aucune catégorie. 
          Ne fourni jamais d'autre contexte que l'objet json. Pas de parole, je dois pouvoir parser ton message.`;

  const chatResponse = await client.chat({
    model: "mistral-large-latest",
    messages: [
      {
        role: "system",
        content: content,
      },
      {
        role: "user",
        content: JSON.stringify(body.message),
      },
    ],
  });

  return NextResponse.json([
    JSON.parse(chatResponse.choices[0].message.content),
  ]);
}
