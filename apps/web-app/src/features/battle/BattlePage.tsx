import { useEffect } from "react";
import { IoIosHome, IoIosWarning } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import { RouterPaths } from "@/App";
import { PokemonSmallCard } from "@/components/pokemon/PokemonSmallCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import { usePokemonBattleStream, usePokemonListByNames } from "@/features/battle/BattlePage.api";

export const BattlePage = () => {
  const { data, isLoading, isError } = usePokemonListByNames();
  const { pokemons = [] } = data || {};
  const pokemon1 = pokemons[0];
  const pokemon2 = pokemons[1];

  const {
    fetchStreamedText,
    content,
    isError: isErrorInStream,
  } = usePokemonBattleStream(pokemon1, pokemon2);

  useEffect(() => {
    fetchStreamedText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.pokemons.length]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Card>
        <span>Une erreur est survenue lors de la réception des Pokémons</span>
        <Link to="/">
          <Button className="w-full" variant="secondary">
            Aller sur la page d'accueil
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
        <PokemonSmallCard pokemon={pokemon1} />
        <img
          className="h-20"
          src="/images/vs.webp"
          alt={`${pokemon1?.name} VS ${pokemon2?.name}`}
        />
        <PokemonSmallCard pokemon={pokemon2} />
      </div>

      <Card
        className={`prose dark:prose-invert min-h-[600px] w-full max-w-4xl overflow-auto p-4 sm:min-h-96 sm:!w-[80%] ${!content ? "items-center justify-center" : ""}`}
      >
        {!content && !isErrorInStream && <Loader />}
        {isErrorInStream && (
          <div className="flex flex-col items-center justify-center gap-4">
            <IoIosWarning className="size-20 text-red-600" />
            <span className="text-center">
              Une erreur est survenue avec le Bot IA GetVirtualBrain ! Vérifiez votre token ou le
              ChatBotId !
            </span>
          </div>
        )}
        {content && <ReactMarkdown>{content}</ReactMarkdown>}
      </Card>
      <Link className="fixed left-4 top-4 z-50 sm:left-10 sm:top-4" to={RouterPaths.HOME}>
        <Button variant="secondary" className="[&_svg]:size-6" title="Retourner à l'acceuil">
          <IoIosHome />
        </Button>
      </Link>
    </div>
  );
};
