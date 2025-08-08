import type {Pokemon} from '@getvirtualbrain-technical-test/shared-types';
import axios from 'axios';

import {__setListPokemons, fetchAllPokemons, fetchPokemonById} from '../src/services/PokemonService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockPokemons: Pokemon[] = [
  {
    "id": 1,
    "pokedexId": 1,
    "name": "Bulbizarre",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "slug": "Bulbizarre",
    "stats": {
      "HP": 45,
      "attack": 49,
      "defense": 49,
      "special_attack": 65,
      "special_defense": 65,
      "speed": 45
    },
    "apiTypes": [
      {
        "name": "Poison",
        "image": "https://static.wikia.nocookie.net/pokemongo/images/0/05/Poison.png"
      },
      {
        "name": "Plante",
        "image": "https://static.wikia.nocookie.net/pokemongo/images/c/c5/Grass.png"
      }
    ],
    "apiGeneration": 1,
    "apiResistances": [
      {
        "name": "Normal",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Combat",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      },
      {
        "name": "Vol",
        "damage_multiplier": 2,
        "damage_relation": "vulnerable"
      },
      {
        "name": "Poison",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Sol",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Roche",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Insecte",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Spectre",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Acier",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Feu",
        "damage_multiplier": 2,
        "damage_relation": "vulnerable"
      },
      {
        "name": "Eau",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      },
      {
        "name": "Plante",
        "damage_multiplier": 0.25,
        "damage_relation": "twice_resistant"
      },
      {
        "name": "Électrik",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      },
      {
        "name": "Psy",
        "damage_multiplier": 2,
        "damage_relation": "vulnerable"
      },
      {
        "name": "Glace",
        "damage_multiplier": 2,
        "damage_relation": "vulnerable"
      },
      {
        "name": "Dragon",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Ténèbres",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Fée",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      }
    ],
    "apiEvolutions": [
      {
        "name": "Herbizarre",
        "pokedexId": 2
      }
    ],
    "apiPreEvolution": "none",
    "apiResistancesWithAbilities": []
  },
  {
    "id": 4,
    "pokedexId": 4,
    "name": "Salamèche",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    "slug": "Salameche",
    "stats": {
      "HP": 39,
      "attack": 52,
      "defense": 43,
      "special_attack": 60,
      "special_defense": 50,
      "speed": 65
    },
    "apiTypes": [
      {
        "name": "Feu",
        "image": "https://static.wikia.nocookie.net/pokemongo/images/3/30/Fire.png"
      }
    ],
    "apiGeneration": 1,
    "apiResistances": [
      {
        "name": "Normal",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Combat",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Vol",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Poison",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Sol",
        "damage_multiplier": 2,
        "damage_relation": "vulnerable"
      },
      {
        "name": "Roche",
        "damage_multiplier": 2,
        "damage_relation": "vulnerable"
      },
      {
        "name": "Insecte",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      },
      {
        "name": "Spectre",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Acier",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      },
      {
        "name": "Feu",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      },
      {
        "name": "Eau",
        "damage_multiplier": 2,
        "damage_relation": "vulnerable"
      },
      {
        "name": "Plante",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      },
      {
        "name": "Électrik",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Psy",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Glace",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      },
      {
        "name": "Dragon",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Ténèbres",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Fée",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      }
    ],
    "apiEvolutions": [
      {
        "name": "Reptincel",
        "pokedexId": 5
      }
    ],
    "apiPreEvolution": "none",
    "apiResistancesWithAbilities": []
  },
  {
    "id": 7,
    "pokedexId": 7,
    "name": "Carapuce",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    "slug": "Carapuce",
    "stats": {
      "HP": 44,
      "attack": 48,
      "defense": 65,
      "special_attack": 50,
      "special_defense": 64,
      "speed": 43
    },
    "apiTypes": [
      {
        "name": "Eau",
        "image": "https://static.wikia.nocookie.net/pokemongo/images/9/9d/Water.png"
      }
    ],
    "apiGeneration": 1,
    "apiResistances": [
      {
        "name": "Normal",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Combat",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Vol",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Poison",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Sol",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Roche",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Insecte",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Spectre",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Acier",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      },
      {
        "name": "Feu",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      },
      {
        "name": "Eau",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      },
      {
        "name": "Plante",
        "damage_multiplier": 2,
        "damage_relation": "vulnerable"
      },
      {
        "name": "Électrik",
        "damage_multiplier": 2,
        "damage_relation": "vulnerable"
      },
      {
        "name": "Psy",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Glace",
        "damage_multiplier": 0.5,
        "damage_relation": "resistant"
      },
      {
        "name": "Dragon",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Ténèbres",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      },
      {
        "name": "Fée",
        "damage_multiplier": 1,
        "damage_relation": "neutral"
      }
    ],
    "apiEvolutions": [
      {
        "name": "Carabaffe",
        "pokedexId": 8
      }
    ],
    "apiPreEvolution": "none",
    "apiResistancesWithAbilities": []
  }
];

describe('fetchAllPokemons', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    __setListPokemons([]);
  });

  it('should fetch all pokemons if not cached', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPokemons });

    const result = await fetchAllPokemons();
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockPokemons);
  });

  it('should return cached pokemons on second call without calling API again', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPokemons });

    await fetchAllPokemons();
    const result = await fetchAllPokemons();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockPokemons);
  });

  it('should filter pokemons by search string', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPokemons });

    const result = await fetchAllPokemons({ search: 'bizarre' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Bulbizarre');
  });

  it('should filter pokemons by type', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPokemons });

    const result = await fetchAllPokemons({ types: ['Feu'] });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Salamèche');
  });

  it('should filter pokemons by list of names', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPokemons });

    const result = await fetchAllPokemons({ names: ['Carapuce'] });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Carapuce');
  });
});

describe('fetchPokemonById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    __setListPokemons([]);
  });

  it('should fetch pokemon by ID from API if cache is empty', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPokemons[0] });

    const result = await fetchPokemonById('1');
    expect(mockedAxios.get).toHaveBeenCalledWith('https://pokebuildapi.fr/api/v1/pokemon/1');
    expect(result.name).toBe('Bulbizarre');
  });

  it('should return pokemon from cache if available', async () => {
    __setListPokemons(mockPokemons);

    const result = await fetchPokemonById('4');
    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(result.name).toBe('Salamèche');
  });

  it('should throw error if pokemon is not found in cache', async () => {
    __setListPokemons(mockPokemons);

    await expect(fetchPokemonById('999')).rejects.toThrow('Pokemon with id 999 not found');
  });
});
