import PokemonList from './PokemonList';
import {usePokemonList} from "./PokemonList.api";
import {PokemonListFilters} from "./filters/PokemonListFilters";
import {Link, useLocation} from "react-router-dom";
import {HomePageState, PokemonSelectionStep} from "../home/HomePage.tsx";
import {Card} from '../../components/ui/Card.tsx';
import {Button} from "../../components/ui/Button.tsx";
import {IoMdArrowBack} from "react-icons/io";
import {RouterPaths} from "../../App.tsx";

export type PokemonListPageState = {
  step?: PokemonSelectionStep;
} & HomePageState

const PokemonListPage= () => {
  const {state} = useLocation();
  const {step, ...homePageState} = (state || {}) as PokemonListPageState;

  const {data: {pokemons = []} = {}, isLoading, isError} = usePokemonList(!!step)

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
      <Link to={RouterPaths.HOME} state={homePageState} className={"absolute left-10 top-10 z-50"}>
        <Button><IoMdArrowBack /></Button>
      </Link>

      <PokemonListFilters />

      {isLoading && (
        <div className="flex items-center h-full flex-1">
          <div className="text-lg text-center w-full">Loading Pokemons...</div>
        </div>
      )}
      {isError && (
        <div className="flex items-center h-full flex-1">
          <div className="text-lg text-center w-full">Une erreur est survenue lors de la réception des pokémons</div>
        </div>
      )}

      <PokemonList pokemons={pokemons} showList={!isLoading && !isError }/>
    </>
  );
};

export default PokemonListPage;
