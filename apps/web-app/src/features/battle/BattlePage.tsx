import {useEffect, useState} from "react";

import {PokemonSmallCard} from "../../components/pokemon/PokemonSmallCard.tsx";
import {Card} from "../../components/ui/Card.tsx";
import {CHAT_BOT_ID, CHAT_BOT_TOKEN, CHAT_BOT_URL} from "../../utils/ShortEnv.ts";

import {usePokemonListByNames} from "./BattlePage.api.ts";

export const BattlePage = () => {
  const {data, isLoading, isError} = usePokemonListByNames()
  const [content, setContent] = useState('');

  const {pokemons} = data || {pokemons: []};

  const pokemon1 = pokemons[0]
  const pokemon2 = pokemons[1]

  const fetchStreamedText = async () => {
    if(!data) {
      return;
    }
    const prompt = `
Tu es un narrateur épique de combats Pokémon.
Décris un combat intense entre ${pokemon1?.name} et ${pokemon2?.name}.
Utilise un ton dynamique, décris les attaques, les réactions, et la conclusion du combat.
Ne révèle pas tout d’un coup, laisse le suspense en construisant progressivement.

Commence maintenant :
`;

    const response = await fetch(`${CHAT_BOT_URL}/open-completion/${CHAT_BOT_ID}/query?query=${prompt}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CHAT_BOT_TOKEN}`,
        'Accept': 'application/json, text/plain, */*',
      },
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (reader) {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setContent((prev) => prev + chunk);
      }
    }

  };

  useEffect(() => {
    fetchStreamedText()
  }, []);

  if(isLoading) {
    return <div>Loading</div>
  }
  if(isError) {
    return <div>Une erreur est survenue lors de la réception des pokémons</div>
  }

  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <div className="flex flex-col gap-4  sm:flex-row sm:gap-8 items-center">
        <PokemonSmallCard pokemon={pokemon1} />
        <img className="h-20" src="/images/vs.webp" alt={`${pokemon1.name} VS ${pokemon2.name}`}  />
        <PokemonSmallCard pokemon={pokemon2} />
      </div>
      <Card className="min-h-[600px] sm:min-h-96 overflow-auto w-full  sm:!w-[80%]">
        <pre>{content}</pre>
      </Card>
    </div>
  )
}
