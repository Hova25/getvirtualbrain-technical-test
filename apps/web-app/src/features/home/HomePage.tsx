import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import {Link, useLocation} from "react-router-dom";

import {RouterPaths} from "../../App";
import {Button} from "../../components/ui/Button";
import {Card} from "../../components/ui/Card";
import {FC} from "react";

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
        <div>{pokemon.name}</div> :
        <Link
          to={RouterPaths.POKEMON_SELECTION}
          state={{ step: POKEMON_SELECTION_STEPS[step === "POKEMON_1"? 0 : 1], ...state}}
          className="w-full px-4 py-2 text-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition"
        >
          Choisir le Pokémon {step === "POKEMON_1" ? "1" : "2"}
        </Link>
      }
    </>
  )
}

export const HomePage = () => {
  const { state } = useLocation()
  const { pokemon1, pokemon2 } = (state || {}) as HomePageState

  return (
    <Card className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white/90 backdrop-blur border border-gray-300  gap-4 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800">Combat Pokémon par IA</h2>
      <p className="text-sm text-gray-600">
          Sélectionne deux Pokémon et assiste à un combat épique dans l’arène généré par l'IA de GetVirtualBrain !
      </p>

      <div className="flex flex-col gap-4">
        <PokemonSelection pokemon={pokemon1} step={"POKEMON_1"}  />
        <PokemonSelection pokemon={pokemon2} step={"POKEMON_2"}  />
      </div>

      <p className="text-xs text-gray-500 italic">
          ⚠️ L’IA décrit le combat en temps réel, avec attaques, suspense et un vainqueur final.
      </p>

      <Button>Lancer le combat !</Button>
    </Card>
  )
}
