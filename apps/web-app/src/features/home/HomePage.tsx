import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import {Link, useLocation} from "react-router-dom";

import {RouterPaths} from "../../App";
import {Button} from "../../components/ui/Button";
import {Card} from "../../components/ui/Card";
import {FC} from "react";
import {PokemonSmallCard} from "../../components/pokemon/PokemonSmallCard.tsx";

export const POKEMON_SELECTION_STEPS = ["POKEMON_1", "POKEMON_2"] as const;
export type PokemonSelectionStep = (typeof POKEMON_SELECTION_STEPS)[number];

export type HomePageState = {
  pokemon1?: Pokemon,
  pokemon2?: Pokemon,
}

type PokemonSelectionProps = {
  pokemon?: Pokemon,
  step: PokemonSelectionStep
}
const PokemonSelection: FC<PokemonSelectionProps> = ({pokemon, step}) => {
  const { state } = useLocation()
  return (
    <>
      {pokemon ?
        <PokemonSmallCard pokemon={pokemon} step={step} /> :
        <Link
          to={RouterPaths.POKEMON_SELECTION}
          className={"w-full"}
          state={{ step: POKEMON_SELECTION_STEPS[step === "POKEMON_1"? 0 : 1], ...state}}
        >
          <Button className={"w-full"} variant={"tertiary"}>
            Choisir le Pokémon {step === "POKEMON_1" ? "1" : "2"}
          </Button>
        </Link>
      }
    </>
  )
}

export const HomePage = () => {
  const { state } = useLocation()
  const { pokemon1, pokemon2 } = (state || {}) as HomePageState

  const isDisabled= !pokemon1 || !pokemon2

  return (
    <Card className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white/90 backdrop-blur border border-gray-300  gap-4 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Combat Pokémon par IA</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
          Sélectionne deux Pokémon et assiste à un combat épique dans l’arène généré par l'IA de GetVirtualBrain !
      </p>

      <div className="flex flex-col gap-4 items-center">
        <PokemonSelection pokemon={pokemon1} step={"POKEMON_1"}  />
        <img
          className="w-14"
          src="/images/vs.webp"
          alt={`${pokemon1?.name} VS ${pokemon2?.name}`}
        />
        <PokemonSelection pokemon={pokemon2} step={"POKEMON_2"}  />
      </div>

      <span className="text-xs text-gray-500 italic dark:text-gray-400">
        L’IA décrit le combat en temps réel, avec attaques, suspense et un vainqueur final.
      </span>

      <Link to={`${RouterPaths.BATTLE}/${pokemon1?.name},${pokemon2?.name}`}
            aria-disabled={isDisabled}
            className={isDisabled ? "pointer-events-none" : ""}
      >
        <Button variant={"secondary"} disabled={isDisabled} className={"w-full"}>Lancer le combat !</Button>
      </Link>
    </Card>
  )
}
