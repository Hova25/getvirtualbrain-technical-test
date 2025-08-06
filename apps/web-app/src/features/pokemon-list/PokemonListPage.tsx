import PokemonList from './PokemonList';
import {usePokemonList} from "./PokemonList.api";
import {PokemonListFilters} from "./filters/PokemonListFilters";

const PokemonListPage= () => {
  const {data: {pokemons = []} = {}, isLoading} = usePokemonList()


  console.log(isLoading)

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
