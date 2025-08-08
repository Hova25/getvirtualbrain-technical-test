import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import {useQuery} from "@tanstack/react-query";
import {useRef, useState} from "react";
import {useParams} from "react-router-dom";

import {axiosInstance} from "../../utils/AxiosInstance.ts";
import {CHAT_BOT_ID, CHAT_BOT_TOKEN, CHAT_BOT_URL} from "../../utils/ShortEnv.ts";

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

export const usePokemonBattleStream = (pokemon1?: Pokemon, pokemon2?: Pokemon) => {
  const [content, setContent] = useState("");
  const [isError, setIsError] = useState(false);
  const bufferRef = useRef("");

  const fetchStreamedText = async () => {
    if (!pokemon1 || !pokemon2) return;

    const prompt = `
Tu es un narrateur épique de combats Pokémon.
Décris un combat intense entre ${pokemon1.name} et ${pokemon2.name}.
Utilise un ton dynamique, décris les attaques, les réactions, et la conclusion du combat.
Ne révèle pas tout d’un coup, laisse le suspense en construisant progressivement.
Il faut absolument que tu énonce le vainqueur.

Commence maintenant :
`;

    try {
      const response = await fetch(
        `${CHAT_BOT_URL}/open-completion/${CHAT_BOT_ID}/query?query=${encodeURIComponent(prompt)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${CHAT_BOT_TOKEN}`,
            Accept: "text/plain",
          },
        }
      );

      if(!response.ok) {
        setIsError(true)
      } else {
        setIsError(false)
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) return;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        bufferRef.current += chunk;

        const safeIndex = Math.max(
          bufferRef.current.lastIndexOf(" "),
          bufferRef.current.lastIndexOf("."),
          bufferRef.current.lastIndexOf("\n")
        );

        if (safeIndex !== -1) {
          const safeText = bufferRef.current.slice(0, safeIndex + 1);
          setContent((prev) => prev + safeText);
          bufferRef.current = bufferRef.current.slice(safeIndex + 1);
        }
      }

      setContent((prev) => prev + bufferRef.current);
      bufferRef.current = "";
    } catch {
      setIsError(true)
    }
  };

  return {
    content,
    isError,
    fetchStreamedText
  }
}
