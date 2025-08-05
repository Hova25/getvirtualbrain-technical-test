import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import React from 'react';

import {useTheme} from "../../components/theme/ThemeContext";

import PokemonCard from './PokemonCard';

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  const { theme } = useTheme();

  if (pokemons.length === 0) {
    return (
      <div className="flex items-center">
        <div className="text-lg text-center w-full">No Pokemon found</div>
      </div>
    );
  }

  return (
    <div className={`flex-1 p-4 grid grid-cols-4 gap-10 place-items-center ${theme === 'light' ? '' : 'bg-slate-800'}`}>
      {pokemons.map((p) => (
        <PokemonCard pokemon={p} key={p.pokedexId} />
      ))}
    </div>
  );
};

export default PokemonList;
