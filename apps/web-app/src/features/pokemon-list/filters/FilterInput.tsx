import {ChangeEvent, useEffect, useState} from "react";
import {useLocation, useSearchParams} from "react-router-dom";

import {Input} from "@/components/ui/Input";
import {useDebounceCallback} from "@/hooks/useDebounceCallback";

export const POKEMON_LIST_SEARCH_PARAM_SEARCH = "search";

export const FilterInput = () => {
  const {state} = useLocation()
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = searchParams.get(POKEMON_LIST_SEARCH_PARAM_SEARCH) || ""
  const [value, setValue] = useState(searchParamsValue)

  const debouncedSearch = useDebounceCallback((value: string) => {
    if (value) {
      searchParams.set(POKEMON_LIST_SEARCH_PARAM_SEARCH, value);
    } else {
      searchParams.delete(POKEMON_LIST_SEARCH_PARAM_SEARCH);
    }
    setSearchParams(searchParams, { state })
  }, 200);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setValue(v)
    debouncedSearch(v);
  }

  useEffect(() => {
    if(searchParamsValue !== value) {
      setValue(searchParamsValue);
    }
  }, [searchParamsValue]);

  return (
    <Input data-testid="selection-search-input" value={value} placeholder="Nom du pokémon" className="self-start w-full md:max-w-48" onChange={handleSearchChange} />
  )
}
