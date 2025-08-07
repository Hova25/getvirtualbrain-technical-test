import {ChangeEvent} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

import {Input} from "../../../components/ui/Input.tsx";
import {useDebounceCallback} from "../../../hooks/useDebounceCallback.ts";

export const POKEMON_LIST_SEARCH_PARAM_SEARCH = "search";

export const FilterInput = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const debouncedSearch = useDebounceCallback((value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(POKEMON_LIST_SEARCH_PARAM_SEARCH, value);
    } else {
      newParams.delete(POKEMON_LIST_SEARCH_PARAM_SEARCH);
    }

    navigate(
      {
        pathname: location.pathname,
        search: newParams.toString(),
      },
      {
        replace: true,
        state: location.state,
      }
    );
  }, 200);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  }

  return (
    <Input defaultValue={searchParams.get(POKEMON_LIST_SEARCH_PARAM_SEARCH) || ""}  placeholder="Nom du pokémon" onChange={handleSearchChange} />
  )
}
