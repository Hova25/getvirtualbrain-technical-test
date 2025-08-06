import {PokemonType} from "@getvirtualbrain-technical-test/shared-types";
import Select, {components, GroupBase, MultiValueGenericProps, OptionProps} from "react-select";

import {PokemonTypeImage} from "../../../components/pokemon/PokemonTypeImage";

import {useGetPokemonTypes} from "./PokemonTypesSelect.api.ts";

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
  return   (
    <components.MultiValueLabel {...props}>
      <div className="flex items-center gap-2">
        <PokemonTypeImage pokemonType={pokemonType} /> {pokemonType.name}
      </div>
    </components.MultiValueLabel>
  )
};

export const PokemonTypesSelect = () => {
  const {data: pokemonTypes} = useGetPokemonTypes()
  return (
    <Select
      // defaultValue={[colourOptions[2], colourOptions[3]]}
      isMulti
      isSearchable
      name="pokemonTypes"
      className="w-96 border-amber-300 focus:ring-2 focus:ring-amber-600 dark:text-amber-50"
      classNames={{
        control: ({ isFocused }) =>
          `dark:!text-amber-50 h-[42px] !border !border-amber-300 !rounded-md !bg-transparent focus:!outline-none
       ${isFocused ? "!ring-2 !ring-amber-600" : ""}`,
        multiValue: () => "!bg-amber-100 text-amber-600 hover:!bg-amber-200 rounded-md px-1",
        multiValueRemove: () => "hover:!bg-amber-300 rounded-sm cursor-pointer",
        menu: () => "!bg-amber-100",
        option: ({ isFocused, isSelected }) => ` !text-black ${isFocused ? "!bg-amber-300" : "!bg-amber-100"} ${isSelected ? "!bg-amber-200" : ""}`
      }}
      options={pokemonTypes}
      onChange={(newValue, actionMeta) => {
        console.log({newValue, actionMeta})
      }}
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
