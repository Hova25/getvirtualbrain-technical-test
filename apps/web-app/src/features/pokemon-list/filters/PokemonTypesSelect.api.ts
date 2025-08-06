import {PokemonType} from "@getvirtualbrain-technical-test/shared-types";
import {useQuery} from "@tanstack/react-query";

import {axiosInstance} from "../../../utils/AxiosInstance.ts";

export const useGetPokemonTypes = () => {
  return useQuery({
    queryKey: ['pokemonTypes'],
    queryFn: async () => {
      const response = await axiosInstance.get<PokemonType[]>('/pokemons/types');
      return response.data
    },
    // la liste n'est pas supposé être modifié, je mets ici Infinity qui permet de ne pas faire de requête à chaque fois que l'on change de page par exemple
    staleTime: Infinity
  })
}
