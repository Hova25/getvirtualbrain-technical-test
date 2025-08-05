import {Header} from '../../components/ui/Header';

import PokemonList from './PokemonList';
import {usePokemonList} from "./PokemonList.api";

const PokemonListPage= () => {
  const {data: {pokemons = []} = {}, isLoading} = usePokemonList()

  if (isLoading) {
    return (
      <div className="flex items-center h-screen">
        <div className="text-lg text-center w-full">Loading Pokemons...</div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 dark:bg-slate-800  flex flex-col items-center h-full">
      <Header/>
      <PokemonList pokemons={pokemons}/>
    </div>
  );
};

export default PokemonListPage;
