import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import axios from 'axios';

const POKEMON_API_URL = 'https://pokebuildapi.fr/api/v1'

/**
 * Je créé une liste in memory ici pour éviter de faire des appels à l'API à chaque fois et gagner en performance.
 * En réalité, il faudrait mettre en place un cache Redis par exemple pour éviter de faire trop d'appels à l'API externe.
 * Alors que la liste ne change pas.
 * Cela permettrait de payer moins cher l'API (dans le cas où c'est payant) et de gagner en performance.
 * De plus, j'ai décidé de faire ça afin de filtrer les pokémons côté serveur.
 * J'aurai pû appeler pokebuildapi mais malheureusement sur la recherche, il faut entrer le nom complet du pokémon
 * et pas une partie du nom, ce qui n'est pas très pratique.
 * Je préfère faire le filtrage côté serveur. J'aurai aussi pû le faire côté client, mais je suis moins fan.
 */
let listPokemons: Pokemon[] = [];

/**
 * Ici je passe un objet et nom des paramètres "simples" pour pouvoir facilement ajouter des paramètres
 * dans le futur sans avoir à modifier la signature de la fonction.
 */
export async function fetchAllPokemons({search = "", types = []}: {search?: string, types?: string[]}): Promise<Pokemon[]> {
  if(listPokemons.length === 0) {
    const result = await axios.get<Pokemon[]>(`${POKEMON_API_URL}/pokemon`)
    if(result.data) {
      listPokemons = result.data
    }
  }

  console.log(listPokemons.length)

  /**
   * Ici je fais un filtrage en mode "OU" sur les types de pokémons.
   * Donc ont récupère tous les pokémons qui ont au moins un type renseigné.
   * J'aurais pu faire un filtrage en mode "ET" mais cela aurait été plus restrictif
   * et donc moins de pokémons seraient retournés.
   */
  const pokemons = (search || types.length > 0)
    ? listPokemons.filter(({name, apiTypes}) => {
      const apiTypesNames = apiTypes.map((apiType) => apiType.name);
      const isInQueryTypesArray = types.length === 0 || apiTypesNames.some(apiTypeName => types.includes(apiTypeName));
      return isInQueryTypesArray && name.toLowerCase().includes(search.toLowerCase())
    })
    : listPokemons;

  return pokemons
}

/**
 * J'ai modifié la récupération d'un pokémon pour qu'il ne fasse pas d'appel API si la liste existe déjà.
 * Toujours dans le but de faire moins d'appels à l'API externe et de gagner en performance.
 */
export async function fetchPokemonById(id: string): Promise<Pokemon> {
  if(listPokemons.length === 0) {
    const result = await axios.get<Pokemon>(`${POKEMON_API_URL}/pokemon/${id}`);
    return result.data;
  }

  return new Promise((resolve, reject) => {
    const pokemon = listPokemons.find(pokemon => pokemon.pokedexId.toString() === id)
    if(pokemon) {
      resolve(pokemon);
    } else {
      reject(new Error(`Pokemon with id ${id} not found`));
    }
  })
}
