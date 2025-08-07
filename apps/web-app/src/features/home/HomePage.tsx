import {Link} from "react-router-dom";

import {RouterPaths} from "../../App.tsx";
import {Button} from "../../components/ui/Button.tsx";
import {Card} from "../../components/ui/Card.tsx";

export const POKEMON_SELECTION_STEPS = ["POKEMON_1", "POKEMON_2"] as const;
export type PokemonSelectionStep = (typeof POKEMON_SELECTION_STEPS)[number];

export const HomePage = () => {
  return (
    <Card className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white/90 backdrop-blur border border-gray-300  gap-4 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800">Combat Pokémon par IA</h2>
      <p className="text-sm text-gray-600">
          Sélectionne deux Pokémon et assiste à un combat épique dans l’arène généré par l'IA de GetVirtualBrain !
      </p>

      <div className="flex flex-col gap-4">
        <Link
          to={RouterPaths.POKEMON_SELECTION}
          state={{ step: POKEMON_SELECTION_STEPS[0]}}
          className="w-full px-4 py-2 text-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition"
        >
            Choisir le Pokémon 1
        </Link>

        <Link
          to={RouterPaths.POKEMON_SELECTION}
          state={{ step: POKEMON_SELECTION_STEPS[1]}}
          className="w-full px-4 py-2 text-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition"
        >
            Choisir le Pokémon 2
        </Link>
      </div>

      <p className="text-xs text-gray-500 italic">
          ⚠️ L’IA décrit le combat en temps réel, avec attaques, suspense et un vainqueur final.
      </p>

      <Button>Lancer le combat !</Button>
    </Card>
  )
}
