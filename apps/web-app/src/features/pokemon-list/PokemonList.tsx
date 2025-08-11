import { Pokemon } from "@getvirtualbrain-technical-test/shared-types";
import { FC } from "react";
import { IoIosWarning } from "react-icons/io";

import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { Card } from "@/components/ui/Card";

interface PokemonListProps {
  pokemons: Pokemon[];
  showList: boolean;
}

const PokemonList: FC<PokemonListProps> = ({ pokemons, showList }) => {
  if (!showList) {
    return null;
  }
  return (
    <>
      {pokemons.length === 0 ? (
        <Card className="flex items-center">
          <IoIosWarning className="size-20 text-amber-600" />
          <div className="w-full text-center text-lg">
            Il n'y a pas de pokémon pour cette recherche.
          </div>
        </Card>
      ) : (
        <div
          data-testid="pokemon-list"
          className="grid flex-1 grid-cols-1 place-items-center gap-10 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {pokemons.map((p) => (
            <PokemonCard pokemon={p} key={`pokemon-${p.pokedexId}`} />
          ))}
        </div>
      )}
    </>
  );
};

export default PokemonList;
