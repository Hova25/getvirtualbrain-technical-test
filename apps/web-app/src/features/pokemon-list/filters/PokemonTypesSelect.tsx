import {PokemonType} from "@getvirtualbrain-technical-test/shared-types";
import {useState} from "react";
import {useLocation, useSearchParams} from "react-router-dom";
import Select, {components, GroupBase, MultiValue, MultiValueGenericProps, OptionProps} from "react-select";

import {PokemonTypeImage} from "../../../components/pokemon/PokemonTypeImage";

import {useGetPokemonTypes} from "./PokemonTypesSelect.api";

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
  const [selectedTypes, setSelectedTypes] = useState<string[] | undefined>(searchParams.get(POKEMON_LIST_SEARCH_PARAM_TYPES)?.split(","));
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

  return (
    <Select
      value={pokemonTypes?.filter((type) => selectedTypes?.includes(type.name))}
      isMulti
      isSearchable
      name="pokemonTypes"
      className="w-full sm:w-96 border-amber-300 focus:ring-2 focus:ring-amber-600 dark:text-amber-50"
      classNames={{
        control: ({ isFocused }) =>
          `dark:!text-amber-50 !min-h-[42px] !border !border-amber-300 !rounded-md !bg-transparent focus:!outline-none ${isFocused ? "!ring-2 !ring-amber-600" : ""}`,
        multiValue: () => "!bg-amber-100 text-amber-600 hover:!bg-amber-200 rounded-md px-1",
        multiValueRemove: () => "hover:!bg-amber-300 rounded-sm cursor-pointer",
        menu: () => "!bg-amber-100",
        option: ({ isFocused, isSelected }) => ` !text-black ${isFocused ? "!bg-amber-300" : "!bg-amber-100"} ${isSelected ? "!bg-amber-200" : ""}`
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
