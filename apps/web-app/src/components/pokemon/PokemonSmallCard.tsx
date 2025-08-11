import { Pokemon } from "@getvirtualbrain-technical-test/shared-types";
import { FC } from "react";
import { LuRefreshCw } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

import { RouterPaths } from "@/App";
import { PokemonTypeImage } from "@/components/pokemon/PokemonTypeImage";
import { Card } from "@/components/ui/Card";
import { PokemonSelectionStep } from "@/features/home/HomePage";

type PokemonSmallCard = {
  pokemon: Pokemon;
  step?: PokemonSelectionStep;
};

export const PokemonSmallCard: FC<PokemonSmallCard> = ({ pokemon, step }) => {
  const { state = {} } = useLocation();
  const { name, image, apiTypes, stats } = pokemon;
  return (
    <Card
      data-testid={`small-card-${step}`}
      className="flex h-40 w-full flex-row items-center !gap-2 px-1 sm:!gap-8 dark:!bg-gray-600"
    >
      <div className="flex flex-col items-center">
        <img className="w-28" src={image} alt={name} />
        <span className="font-bold">{name}</span>
      </div>
      <div className="flex h-full flex-1 flex-col justify-between py-3 sm:py-0">
        <div className="flew-row flex gap-2">
          {apiTypes.map((pokemonType) => (
            <PokemonTypeImage
              key={pokemonType.name}
              className="self-end"
              pokemonType={pokemonType}
            />
          ))}
        </div>
        <ul className="flex flex-col">
          <li>
            HP: <span className="font-bold">{stats.HP}</span>
          </li>
          <li>
            Attack: <span className="font-bold">{stats.attack}</span>
          </li>
          <li>
            Defense: <span className="font-bold">{stats.defense}</span>
          </li>
          <li>
            Speed: <span className="font-bold">{stats.speed}</span>
          </li>
        </ul>
      </div>
      {step && (
        <Link
          to={RouterPaths.POKEMON_SELECTION}
          state={{ ...state, step }}
          className="group cursor-pointer [&_svg]:size-8 md:[&_svg]:size-12"
        >
          <LuRefreshCw className="text-amber-300 group-hover:text-amber-400" />
        </Link>
      )}
    </Card>
  );
};
