import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";

export const pokemonToMarkdown = (pokemon: Pokemon): string => {
  const {
    name, pokedexId, slug,
    image, sprite, stats,
    apiGeneration, apiTypes, apiResistances,
    apiEvolutions, apiPreEvolution
  } = pokemon

  return `
# Pokémon: ${name}

## Informations générales
- **Pokedex ID**: ${pokedexId}
- **Slug**: ${slug}
- **Génération**: ${apiGeneration}

## Images
- **Image officielle**: ${image}
- **Sprite**: ${sprite}

## Statistiques
| Statistique       | Valeur |
|-------------------|--------|
${Object.entries(stats)
    .map(([key, value]) => `| ${key} | ${value} |`)
    .join('\n')}

## Types
| Type    | Image |
|---------|-------|
${apiTypes
    .map((t) => `| ${t.name} | ${t.image} |`)
    .join('\n')}

## Résistances
| Type     | Multiplicateur | Relation            |
|----------|----------------|--------------------|
${apiResistances
    .map((r) => `| ${r.name} | ${r.damage_multiplier} | ${r.damage_relation} |`)
    .join('\n')}

## Évolution
- **Pré-évolution**: ${apiPreEvolution?.name || 'Aucune'} (ID: ${apiPreEvolution?.pokedexId || 'N/A'})
- **Évolutions possibles**: ${apiEvolutions.map((e) => `${e.name} (ID: ${e.pokedexId})`).join(', ') || 'Aucune'}
`;
}
