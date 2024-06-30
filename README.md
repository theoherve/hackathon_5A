## Lancement du projet

1. Setup les keys API dans un fichier .env.local

2. Lancement de docker avec postgresql :

```bash
docker compose up -d
```

3. Migration prisma :

```bash
npx prisma db push --force-reset
```

4. Chargement des fausse données :

```bash
node scripts/seed.js
```

5. Lancement de l'aplication NextJS

````bash
npm run dev
```

## Equipe - pseudo github

- Jerrinald KANIKAINATHAN / Jerrinald
- Armand DE FARIA LEITE / Iz0nite
- Théo HERVÉ / theoherve
- Alexandre Hardy / AlexandreHardyy
- Noé PIGEAU / NoePigeau

## Liste des fonctionnalités

- **Reproduction du tableau de liste des patients**

  - HERVÉ Théo

- **Création d'une nouvelle colonne pour modifier les pastilles de couleurs et afficher les informations ajoutées**

  - HERVÉ Théo

- **Création de la modal pour présenter les informations propres au patient**

  - HERVÉ Théo

- **Style global des pages**

  - HERVÉ Théo, KANIKAINATHAN Jerrinald

- **Reproduction de la visualisation des messages**

  - KANIKAINATHAN Jerrinald

- **Tutoriel de fonctionnement du tableau**

  - HERVÉ Théo

- **Utilisation d'un model de donnée Mistral en local**

  - HARDY Alexandre

- **Estimation du problème du patient ainsi que des conseils via l'IA Mistral**

  - DE FARIA LEITE Armand

- **Transcription des appels audio via l'IA OPENAI**

  - DE FARIA LEITE Armand

- **Résumé des appels audios et génération de mots-clés**

  - DE FARIA LEITE Armand, KANIKAINATHAN Jerrinald

- **Affichage d'un avis des statistiques globales sur la page statistique**

  - DE FARIA LEITE Armand

- **Diagramme circulaire avec la répartition des avis positifs et négatifs**

  - HARDY Alexandre, DE FARIA LEITE Armand

- **Statistiques globale positif, négatif et neutre**

  - HARDY Alexandre, HERVÉ Théo

- **Paramètrage dynamique des services sur la page paramètre des statistique**

  - HARDY Alexandre

- **Optimisation de l'envoie de message uniquement une fois avec enregistrement de version sur la page statistique**

  - HARDY Alexandre

- **Comparaion des versions de statistiques**

  - HARDY Alexandre

- **Gestion de la détection d'un nouveau message pour proposer une nouvelle version de statistique**
  - HARDY Alexandre
- **Gestion de la data et database**

  - PIGEAU Noé

- **Cohérence des donnée utilisateurs**
  - PIGEAU Noé

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
