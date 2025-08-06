import {Pokemon, PokemonType} from "@getvirtualbrain-technical-test/shared-types";
import axios from 'axios'
import {type Request, type Response, Router} from 'express'

const PokemonController = Router()
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

PokemonController.get(
  '',
  async (req: Request, res: Response) => {
    try {
      const { search } = req.query as { search?: string }

      if(!listPokemons.length) {
        const result = await axios.get<Pokemon[]>(`${POKEMON_API_URL}/pokemon`)
        if(result.data) {
          listPokemons = result.data
        }
      }

      const pokemons = search ? listPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase())) : listPokemons
      return res.status(200).send({pokemons})
    } catch {
      console.error('Error fetching pokemons')
      return res.status(500).send({description: "Une erreur est survenue lors de la récupération des pokémons."})
    }
  }
)

/**
 * Ici pareillement, je créé une liste in memory pour éviter de faire des appels à pokebuildapi à chaque fois.
 */
let listPokemonTypes: PokemonType[] = [];

PokemonController.get("/types", async (_, res: Response) => {
  try {
    if(!listPokemonTypes.length) {
      const result = await axios.get<PokemonType[]>(`${POKEMON_API_URL}/types`)
      if(result.data) {
        listPokemonTypes = result.data
      }
    }

    return res.status(200).send(listPokemonTypes)
  } catch (error) {
    console.error('Error fetching pokemon types', error)
    return res.status(500).send({description: "Une erreur est survenue lors de la récupération des types de pokémons."})
  }
})

PokemonController.get(
  '/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await axios.get<Pokemon>(`${POKEMON_API_URL}/pokemon/${id}`)

    const pokemon = result.data

    return res.status(200).send({pokemon})
  }
)

export { PokemonController }
