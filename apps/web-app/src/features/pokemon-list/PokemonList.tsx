import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import {FC} from 'react';

import PokemonCard from '../../components/pokemon/PokemonCard';

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList: FC<PokemonListProps> = ({ pokemons }) => {
  if (pokemons.length === 0) {
    return (
      <div className="flex items-center">
        <div className="text-lg text-center w-full">No Pokemon found</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid xl:grid-cols-4 gap-10 place-items-center dark:bg-slate-800">
      {pokemons.map((p) => (
        <PokemonCard pokemon={p} key={`pokemon-${p.pokedexId}`} />
      ))}
    </div>
  );
};

export default PokemonList;
