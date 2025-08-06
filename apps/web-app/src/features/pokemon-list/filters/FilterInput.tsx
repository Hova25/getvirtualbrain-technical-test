import {ChangeEvent} from "react";
import {useSearchParams} from "react-router-dom";

import {useDebounceCallback} from "../../../hooks/useDebounceCallback.ts";

export const POKEMON_LIST_SEARCH_PARAM_SEARCH = "search";

export const FilterInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedSearch = useDebounceCallback((value: string) => {
    if (value) {
      searchParams.set(POKEMON_LIST_SEARCH_PARAM_SEARCH, value);
    } else {
      searchParams.delete(POKEMON_LIST_SEARCH_PARAM_SEARCH);
    }
    setSearchParams(searchParams)
  }, 200);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  }

  return (
    <input defaultValue={searchParams.get(POKEMON_LIST_SEARCH_PARAM_SEARCH) || ""} className="border" placeholder="Pokemon name" onChange={handleSearchChange} />
  )
}
