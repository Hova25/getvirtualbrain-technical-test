import {FilterInput} from "./FilterInput.tsx";
import {PokemonTypesSelect} from "./PokemonTypesSelect.tsx";

export const PokemonListFilters = () => {
  return <div className="py-4 flex flex-row gap-4 items-center justify-center">
    <FilterInput />
    <PokemonTypesSelect />
  </div>
}
