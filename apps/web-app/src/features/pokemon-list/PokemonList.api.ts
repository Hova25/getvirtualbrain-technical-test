import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";

import {axiosInstance} from "../../utils/AxiosInstance";

import {POKEMON_LIST_SEARCH_PARAM_SEARCH} from "./filters/FilterInput.tsx";

const URL = "pokemons";

export const usePokemonList = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get(POKEMON_LIST_SEARCH_PARAM_SEARCH);

  return useQuery({
    queryKey: ['pokemonList', {search}],
    queryFn: async ({queryKey: [, {search}]}) => {
      const data = await axiosInstance.get<{pokemons: Pokemon[]}>(URL, {
        params: {
          search
        }
      })
      return data.data
    }
  });
}
