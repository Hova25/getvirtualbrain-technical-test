import {useLocation} from "react-router-dom";

import {Card} from "../../../components/ui/Card";
import {PokemonListPageState} from "../PokemonListPage";

import {FilterInput} from "./FilterInput";
import {PokemonTypesSelect} from "./PokemonTypesSelect";

export const PokemonListFilters = () => {
  const {state} = useLocation();
  const {step} = (state || {}) as PokemonListPageState;
  return <Card className="py-4 flex flex-col gap-4 items-center justify-center z-40">
    <span>Selection du {step === "POKEMON_1"? "premier" : "second"} Pokemon !</span>
    <div className="flex flex-col md:flex-row  gap-4">
      <FilterInput />
      <PokemonTypesSelect />
    </div>
  </Card>
}
