import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import {useQuery} from "@tanstack/react-query";

import {axiosInstance} from "../../utils/AxiosInstance";

export const usePokemonList = () => {
  return useQuery({
    queryKey: ['pokemonList'],
    queryFn: async () => {
      const data = await axiosInstance.get<{pokemons: Pokemon[]}>("pokemons")
      return data.data
    }
  });
}
