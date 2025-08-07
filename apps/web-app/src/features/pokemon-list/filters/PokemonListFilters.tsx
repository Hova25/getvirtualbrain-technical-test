import {IoRefresh} from "react-icons/io5";
import {useLocation, useSearchParams} from "react-router-dom";

import {Button} from "../../../components/ui/Button";
import {Card} from "../../../components/ui/Card";
import {PokemonListPageState} from "../PokemonListPage";

import {FilterInput} from "./FilterInput";
import {PokemonTypesSelect} from "./PokemonTypesSelect";

export const PokemonListFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {state} = useLocation();
  const {step} = (state || {}) as PokemonListPageState;

  const handleCleanFilters = () => {
    setSearchParams(new URLSearchParams(), {state});
  }

  return <Card className="py-4 flex flex-col gap-4 items-center justify-center z-40">
    <div className="flex flex-row justify-between w-full items-center">
      <span>Selection du {step === "POKEMON_1"? "premier" : "second"} Pokemon !</span>
      {searchParams.size > 0 && (
        <Button onClick={handleCleanFilters}><IoRefresh /></Button>
      )}
    </div>

    <div className="flex flex-col md:flex-row  gap-4">
      <FilterInput />
      <PokemonTypesSelect />
    </div>
  </Card>
}
