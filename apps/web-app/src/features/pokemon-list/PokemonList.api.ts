import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";

import {axiosInstance} from "../../utils/AxiosInstance";

import {POKEMON_LIST_SEARCH_PARAM_SEARCH} from "./filters/FilterInput";
import {POKEMON_LIST_SEARCH_PARAM_TYPES} from "./filters/PokemonTypesSelect";

const URL = "pokemons";

export const usePokemonList = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get(POKEMON_LIST_SEARCH_PARAM_SEARCH);
  const types = searchParams.get(POKEMON_LIST_SEARCH_PARAM_TYPES);

  return useQuery({
    queryKey: ['pokemonList', {search, types}],
    queryFn: async ({queryKey: [, {search, types}]}) => {
      const response = await axiosInstance.get<{pokemons: Pokemon[]}>(URL, {
        params: {
          search,
          types
        }
      })
      return response.data
    },
    // la liste n'est pas supposé être modifié, je mets ici Infinity qui permet de ne pas faire de requête à chaque fois que l'on change de page par exemple, ou que les filtres changent
    staleTime: Infinity
  });
}
