import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";

import {POKEMON_LIST_SEARCH_PARAM_SEARCH} from "@/features/pokemon-list/filters/FilterInput";
import {POKEMON_LIST_SEARCH_PARAM_TYPES} from "@/features/pokemon-list/filters/PokemonTypesSelect";
import {axiosInstance} from "@/utils/AxiosInstance";

const URL = "pokemons";

export const usePokemonList = (enabled: boolean = true) => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get(POKEMON_LIST_SEARCH_PARAM_SEARCH);
  const types = searchParams.get(POKEMON_LIST_SEARCH_PARAM_TYPES);

  return useQuery({
    queryKey: ['pokemonList', {search, types}],
    queryFn: async () => {
      const response = await axiosInstance.get<{pokemons: Pokemon[]}>(URL, {
        params: {
          search,
          types
        }
      })
      return response.data
    },
    enabled,
    // la liste n'est pas supposé être modifié, je mets ici Infinity qui permet de ne pas faire de requête à chaque fois que l'on change de page par exemple, ou que les filtres changent
    staleTime: Infinity
  });
}
