import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";

import {axiosInstance} from "../../utils/AxiosInstance.ts";

export const usePokemonListByNames = () => {
  const { names: paramsNames } = useParams<{ names: string }>();
  const names =  paramsNames?.split(",") ||[];

  return useQuery({
    queryKey: ['pokemonList', {names}],
    queryFn: async () => {
      const response = await axiosInstance.get<{pokemons: Pokemon[]}>(`pokemons`, {
        params: {
          names: paramsNames
        }
      })
      return response.data
    },
    enabled: names.length > 0,
    // la liste n'est pas supposé être modifié, je mets ici Infinity qui permet de ne pas faire de requête à chaque fois que l'on change de page par exemple, ou que les filtres changent
    staleTime: Infinity
  });
}
