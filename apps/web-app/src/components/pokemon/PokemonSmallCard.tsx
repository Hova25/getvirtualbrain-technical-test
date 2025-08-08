import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import {FC} from "react";
import {LuRefreshCw} from "react-icons/lu";
import {Link, useLocation} from "react-router-dom";

import {RouterPaths} from "../../App";
import {PokemonSelectionStep} from "../../features/home/HomePage";
import {Card} from "../ui/Card";

import {PokemonTypeImage} from "./PokemonTypeImage";

type PokemonSmallCard = {
  pokemon: Pokemon
  step?: PokemonSelectionStep
}

export const PokemonSmallCard: FC<PokemonSmallCard> = ({pokemon, step}) => {
  const {state = {}} = useLocation()
  const {name, image,apiTypes, stats} = pokemon
  return (
    <Card data-testid={`small-card-${step}`} className="flex flex-row items-center w-full !gap-2 px-1 sm:!gap-8 h-40 dark:!bg-gray-600">
      <div className="flex flex-col items-center">
        <img className="w-28" src={image} alt={name}  />
        <span className="font-bold">
          {name}
        </span>
      </div>
      <div className="flex flex-col flex-1 h-full justify-between py-3 sm:py-0">
        <div className="flex flew-row gap-2">
          {apiTypes.map((pokemonType) => (
            <PokemonTypeImage key={pokemonType.name} className="self-end" pokemonType={pokemonType} />
          ))}
        </div>
        <ul className="flex flex-col">
          <li>HP: <span className="font-bold">{stats.HP}</span></li>
          <li>Attack: <span className="font-bold">{stats.attack}</span></li>
          <li>Defense: <span className="font-bold">{stats.defense}</span></li>
          <li>Speed: <span className="font-bold">{stats.speed}</span></li>
        </ul>
      </div>
      {step && (
        <Link  to={RouterPaths.POKEMON_SELECTION} state={{...state, step}} className="[&_svg]:size-8 md:[&_svg]:size-12 group cursor-pointer">
          <LuRefreshCw className="text-amber-300 group-hover:text-amber-400" />
        </Link>
      )}
    </Card>
  )
}
