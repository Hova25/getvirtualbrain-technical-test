# Installation

## Pré-requis

- Node v22 minimum `node -v`
- Avoir pnpm comme package manager

> Pour voir si vous avez pnpm : `pnpm -v`
> Sinon installer pnpm : `npm install -g pnpm`


Pour pouvoir lancer les tests e2e playwright installer:
`pnpx playwright install`

## Premier lancement

À la racine du projet lancez : `pnpm install`
Afin d'installer tous les node_modules du mono repo.

Pensez à modifier le .env.local dans apps/web-app/env.local (j'ai ajouté les clés mais c'est juste pour le test)

```VITE_CHAT_BOT_TOKEN, VITE_CHAT_BOT_ID```

## Mode dev

Faire `pnpm dev` à la racine du projet le backend et le frontend devraient se lancer en même temps

Pour installer un nouveau package vous pouvez faire pour le backend
`pnpm --filter backend add {monPackage}` ou pour le frontend `pnpm --filter web-app add {monPackage}`

## Lancer les tests

Pour lancer les tests à la racine du projet, vous pouvez faire `pnpm test`

> Attention pour que les tests E2E fonctionnent, il faut lancer le backend `pnpm dev` qui lancera le back et le front ou `pnpm --filter backend dev`.

Pour lancer l'UI de playwright vous pouvez faire `pnpm --filter web-app test:ui`


## Autre

~~Je tiens à m’excuser de ne pas avoir pris le temps de configurer correctement les fichiers tsconfig. J’aurais souhaité vous livrer un projet avec des imports absolus via des alias TypeScript, mais j’ai préféré ne pas modifier la configuration initiale.~~

De même, l’ajout de Prettier pour standardiser l’indentation et limiter la longueur des lignes aurait amélioré la lisibilité du code, mais je n’ai malheureusement pas pu l’intégrer à temps.

À noter également que je sais mettre en ligne ce type de projet facilement et mettre en place un pipeline CI/CD avec GitHub Actions.

>Je vous remercie sincèrement pour le temps que vous consacrerez à la lecture de ce test, et reste bien sûr disponible à tout moment si vous rencontrez le moindre souci en l’examinant.
