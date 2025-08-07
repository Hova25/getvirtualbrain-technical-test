import {useEffect, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";

import {PokemonSmallCard} from "../../components/pokemon/PokemonSmallCard.tsx";
import {Card} from "../../components/ui/Card.tsx";
import {CHAT_BOT_ID, CHAT_BOT_TOKEN, CHAT_BOT_URL} from "../../utils/ShortEnv.ts";

import {usePokemonListByNames} from "./BattlePage.api.ts";

export const BattlePage = () => {
  const { data, isLoading, isError } = usePokemonListByNames();
  const [content, setContent] = useState("");
  const bufferRef = useRef("");

  const { pokemons = [] } = data || {};
  const pokemon1 = pokemons[0];
  const pokemon2 = pokemons[1];

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

    // dernier flush
    setContent((prev) => prev + bufferRef.current);
    bufferRef.current = "";
  };

  useEffect(() => {
    fetchStreamedText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.pokemons.length]);

  if (isLoading) {
    return <div>Loading…</div>;
  }

  if (isError) {
    return <div>Une erreur est survenue lors de la réception des Pokémons</div>;
  }

  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8 items-center">
        <PokemonSmallCard pokemon={pokemon1} />
        <img
          className="h-20"
          src="/images/vs.webp"
          alt={`${pokemon1?.name} VS ${pokemon2?.name}`}
        />
        <PokemonSmallCard pokemon={pokemon2} />
      </div>

      <Card className="min-h-[600px] sm:min-h-96 overflow-auto w-full sm:!w-[80%] prose dark:prose-invert">
        <ReactMarkdown>{content}</ReactMarkdown>
      </Card>
    </div>
  );
};
