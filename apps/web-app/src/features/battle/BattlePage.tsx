import {useEffect} from "react";
import {IoIosHome, IoIosWarning} from "react-icons/io";
import ReactMarkdown from "react-markdown";
import {Link} from "react-router-dom";

import {RouterPaths} from "../../App.tsx";
import {PokemonSmallCard} from "../../components/pokemon/PokemonSmallCard.tsx";
import {Button} from "../../components/ui/Button.tsx";
import {Card} from "../../components/ui/Card.tsx";
import {Loader} from "../../components/ui/Loader.tsx";

import {usePokemonBattleStream, usePokemonListByNames} from "./BattlePage.api.ts";

export const BattlePage = () => {
  const { data, isLoading, isError } = usePokemonListByNames();
  const { pokemons = [] } = data || {};
  const pokemon1 = pokemons[0];
  const pokemon2 = pokemons[1];

  const {fetchStreamedText, content, isError: isErrorInStream} = usePokemonBattleStream(pokemon1, pokemon2);

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
        <Link to="/"><Button className="w-full" variant="secondary">Aller sur la page d'accueil</Button></Link>
      </Card>
    );
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

      <Card className={`min-h-[600px] sm:min-h-96 p-4 overflow-auto w-full sm:!w-[80%] max-w-4xl prose dark:prose-invert ${!content ? "items-center justify-center" : ""}`}>
        {!content && !isErrorInStream && (<Loader />)}
        {isErrorInStream && (
          <div className="flex flex-col gap-4 items-center justify-center ">
            <IoIosWarning className="text-red-600 size-20" />
            <span className="text-center">Une erreur est survenue avec le Bot IA GetVirtualBrain ! Vérifiez votre token ou le ChatBotId !</span>
          </div>
        )}
        {content && <ReactMarkdown>{content}</ReactMarkdown>}
      </Card>
      <Link className="fixed top-4 left-4 sm:top-4 sm:left-10  z-50" to={RouterPaths.HOME}>
        <Button variant="secondary" className="[&_svg]:size-6" title="Retourner à l'acceuil">
          <IoIosHome />
        </Button>
      </Link>
    </div>
  );
};
