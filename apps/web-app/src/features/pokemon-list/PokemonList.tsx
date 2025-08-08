import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import {FC} from 'react';
import {IoIosWarning} from "react-icons/io";

import {PokemonCard} from "../../components/pokemon/PokemonCard.tsx";
import {Card} from "../../components/ui/Card.tsx";

interface PokemonListProps {
  pokemons: Pokemon[];
  showList: boolean
}

const PokemonList: FC<PokemonListProps> = ({ pokemons, showList }) => {
  if(!showList) {
    return null
  }
  return (
    <>
      {pokemons.length === 0 ? (
        <Card className="flex items-center">
          <IoIosWarning className="text-amber-600 size-20" />
          <div className="text-lg text-center w-full">Il n'y a pas de pokémon pour cette recherche.</div>
        </Card>
      ) : (
        <div data-testid="pokemon-list" className="flex-1 p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid xl:grid-cols-4 gap-10 place-items-center">
          {pokemons.map((p) => (
            <PokemonCard pokemon={p} key={`pokemon-${p.pokedexId}`} />
          ))}
        </div>
      )}
    </>
   )
};

export default PokemonList;
