import {type Request, type Response, Router} from 'express'

import {pokemonToMarkdown} from "../services/ContentService";
import {fetchPokemonById} from "../services/PokemonService";

const ContentController = Router()

/**
 * Save all pokemon as markdown in markdown folder
 * @route GET /contents/all
 * @group Contents
*/
ContentController.get(
  '/all',
  async (_req: Request, res: Response) => {
    return res.sendStatus(200)
  }
)

/**
 * Return a pokemon as markdown
 * @route GET /contents/:id
 * @group Contents
 * @param {string} id.path.required - Pokemon ID
*/
ContentController.get(
  '/:pokemonId',
  async (req: Request, res: Response) => {
    try {
      const { pokemonId } = req.params
      const pokemon = await fetchPokemonById(pokemonId)

      res.setHeader('Content-Type', 'text/markdown');
      res.setHeader('Content-Disposition', `attachment; filename=pokemon-${pokemon.name}-${pokemon.pokedexId}.md`);
      return res.send(pokemonToMarkdown(pokemon));
    } catch {
      return res.status(404).send({error: "Pokemon not found"})
    }
  }
)

export { ContentController }
