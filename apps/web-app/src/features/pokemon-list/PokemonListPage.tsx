import PokemonList from './PokemonList';
import {usePokemonList} from "./PokemonList.api";
import {PokemonListFilters} from "./filters/PokemonListFilters";
import {Link, useLocation} from "react-router-dom";
import {PokemonSelectionStep} from "../home/HomePage.tsx";
import {Card} from '../../components/ui/Card.tsx';
import {Button} from "../../components/ui/Button.tsx";

export type PokemonListPageState = {
  step?: PokemonSelectionStep;
}

const PokemonListPage= () => {
  const {state} = useLocation();
  const {step} = (state || {}) as PokemonListPageState;

  const {data: {pokemons = []} = {}, isLoading} = usePokemonList(!!step)

  if(!step) {
    return (
      <Card className={"items-center"}>
        <span>Vous devez d'abord passer par la page d'accueil pour sélectionner un pokémon !</span>
        <Link to={"/"}><Button>Retourner sur la page d'accueil</Button></Link>
      </Card>
    )
  }


  return (
    <>
      <PokemonListFilters />
      {isLoading && (
        <div className="flex items-center h-full flex-1">
          <div className="text-lg text-center w-full">Loading Pokemons...</div>
        </div>
      )}
      {!isLoading && (
        <PokemonList pokemons={pokemons}/>
      )}
    </>
  );
};

export default PokemonListPage;
