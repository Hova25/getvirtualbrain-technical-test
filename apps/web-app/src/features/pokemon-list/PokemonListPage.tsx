import PokemonList from './PokemonList';
import {usePokemonList} from "./PokemonList.api";
import {PokemonListFilters} from "./filters/PokemonListFilters";
import {Link, useLocation} from "react-router-dom";
import {HomePageState, PokemonSelectionStep} from "../home/HomePage.tsx";
import {Card} from '../../components/ui/Card.tsx';
import {Button} from "../../components/ui/Button.tsx";
import {IoIosWarning, IoMdArrowBack} from "react-icons/io";
import {RouterPaths} from "../../App.tsx";
import {Loader} from "../../components/ui/Loader.tsx";

export type PokemonListPageState = {
  step?: PokemonSelectionStep;
} & HomePageState

const PokemonListPage= () => {
  const {state} = useLocation();
  const {step, ...homePageState} = (state || {}) as PokemonListPageState;

  const {data: {pokemons = []} = {}, isLoading, isError, refetch} = usePokemonList(!!step)

  if(!step) {
    return (
      <Card className={"items-center"}>
        <span>Vous devez d'abord passer par la page d'accueil pour sélectionner un pokémon !</span>
        <Link to={RouterPaths.HOME}><Button>Retourner sur la page d'accueil</Button></Link>
      </Card>
    )
  }

  return (
    <>
      <Link to={RouterPaths.HOME} state={homePageState} className={"fixed top-4 left-4 sm:top-4 sm:left-10  z-50"}>
        <Button variant="secondary" className="sm:top-4 sm:left-10 [&_svg]:size-6" title="Retourner à l'acceuil"><IoMdArrowBack /></Button>
      </Link>

      <PokemonListFilters />
      {isLoading && (
        <div className="flex items-center h-full flex-1">
          <Loader />
        </div>
      )}
      {isError && (
        <Card className="flex flex-col gap-4 items-center">
          <IoIosWarning className="text-red-600 size-20" />
          <div className="text-lg text-center w-full">Une erreur est survenue lors de la réception des pokémons</div>
          <Button onClick={() => refetch()} variant={"secondary"}>Réessayer</Button>
        </Card>
      )}

      <PokemonList pokemons={pokemons} showList={!isLoading && !isError }/>
    </>
  );
};

export default PokemonListPage;
