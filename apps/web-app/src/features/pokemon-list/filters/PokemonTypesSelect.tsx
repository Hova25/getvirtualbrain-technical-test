import {PokemonType} from "@getvirtualbrain-technical-test/shared-types";
import {useEffect, useState} from "react";
import {useLocation, useSearchParams} from "react-router-dom";
import Select, {components, GroupBase, MultiValue, MultiValueGenericProps, OptionProps} from "react-select";

import {useGetPokemonTypes} from "./PokemonTypesSelect.api";

import {PokemonTypeImage} from "@/components/pokemon/PokemonTypeImage";

export const POKEMON_LIST_SEARCH_PARAM_TYPES = "types";

const Option = (props: OptionProps<PokemonType, true, GroupBase<PokemonType>>) => {
  const {data: pokemonType} = props
  return   (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <PokemonTypeImage pokemonType={pokemonType} /> {pokemonType.name}
      </div>
    </components.Option>
  )
};

const MultiValueLabel = (props: MultiValueGenericProps<PokemonType>) => {
  const {data: pokemonType} = props
  return (
    <components.MultiValueLabel {...props}>
      <div className="flex items-center gap-2">
        <PokemonTypeImage pokemonType={pokemonType} /> {pokemonType.name}
      </div>
    </components.MultiValueLabel>
  )
};

export const PokemonTypesSelect = () => {
  // Je fais un state et un searchParams ici car le search params ne se met pas à jour immédiatement
  // et donc le state est nécessaire pour que le composant se mette à jour immédiatement.
  // Sinon, le composant ne se mettrait pas à jour immédiatement et on aurait un problème de performance.
  const [searchParams, setSearchParams] = useSearchParams();
  const {state} = useLocation()
  const searchParamsValue = searchParams.get(POKEMON_LIST_SEARCH_PARAM_TYPES)?.split(",")
  const [selectedTypes, setSelectedTypes] = useState<string[] | undefined>();
  const {data: pokemonTypes} = useGetPokemonTypes()

  const handleChange = (newValue: MultiValue<PokemonType>) => {
    if(newValue.length > 0) {
      searchParams.set(POKEMON_LIST_SEARCH_PARAM_TYPES, newValue.map(({name}) => name).toString())
      setSelectedTypes(newValue.map(({name}) => name))
    } else {
      searchParams.delete(POKEMON_LIST_SEARCH_PARAM_TYPES)
      setSelectedTypes([])
    }
    setSearchParams(searchParams, {state})
  }

  useEffect(() => {
    if(searchParamsValue?.length !== selectedTypes?.length) {
      setSelectedTypes(searchParamsValue);
    }
  }, [searchParamsValue]);

  return (
    <Select
      value={pokemonTypes?.filter((type) => selectedTypes?.includes(type.name))}
      isMulti
      isSearchable
      aria-label="Selectionnez un type de pokémon"
      name="pokemonTypes"
      className="w-full sm:w-96 border-amber-300 focus:ring-2 focus:ring-amber-600 dark:!text-gray-200"
      classNames={{
        control: ({ isFocused }) =>
          `!min-h-[42px] !border !border-amber-300 !rounded-md !bg-gray-200 dark:!bg-gray-900 focus:!outline-none ${isFocused ? "!ring-2 !ring-amber-600" : ""}`,
        multiValue: () => "!bg-amber-200 text-amber-600 hover:!bg-amber-300 rounded-md px-1",
        multiValueRemove: () => "hover:!bg-amber-300 rounded-sm cursor-pointer",
        menu: () => "!bg-gray-200 dark:!bg-gray-800",
        input:() => "dark:!text-gray-200",
        dropdownIndicator: () => "dark:!text-gray-200",
        option: ({ isFocused, isSelected }) => `transition-colors ${isFocused ? "!bg-amber-300 dark:!text-gray-800" : "!text-black !bg-gray-200 dark:!text-gray-200 dark:!bg-gray-800"} ${isSelected ? "!bg-amber-200" : ""}`
      }}
      options={pokemonTypes}
      onChange={handleChange}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.name}
      placeholder="Types de pokémon"
      components={{
        Option,
        MultiValueLabel
      }}
    />
  )
}
