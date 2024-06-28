import MistralClient from "@mistralai/mistralai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const client = new MistralClient(process.env.MISTRAL_API_KEY);

  const body = await request.json();

  const content = `Je te donne cette liste de catégories : ${body.categories.map((value: string) => value)}.
          Je vais te donner un JSON, avec un tableau contenant des message de clients dans le milieu de la santé. 
          Peux tu analyser le message pour me dire si le message parle d'une des catégories, 
          et noter cette catégorie. Je veux que tu me retourne le résultat sous forme d'un objet JSON sous ce format { resultat: { [categoryName]: { positive: number, negative: number }, ..., none: number }, avis: { global: string, [categoryName]; string, ... } }, avec deux clefs, la première nommé 'resultat', qui est un objet,
          avec comme clefs chaque categories (donc rajoute bien toute les catégories présentent), et en valeur un objet avec deux valeurs, nommé 'positive' et 'negative', 
          fait une catégorie spéciale nommé 'none' pour ce qui ne rentre dans aucune catégorie. Dans la categorie 'none', 
          tu mettras une seule valeur, directement la valeur en nombre. 
          La deuxième clef est 'avis', qui est un resume de l'analyse que tu as faite pour chaque categories en fonction des messages mais il y a aussi un attribut global pour donner un avis générale et n'hésite pas à bien détailler sur ce dernier. 
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

  return NextResponse.json(JSON.parse(chatResponse.choices[0].message.content));
}
