import { IoRefresh } from "react-icons/io5";
import { useLocation, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FilterInput } from "@/features/pokemon-list/filters/FilterInput";
import { PokemonTypesSelect } from "@/features/pokemon-list/filters/PokemonTypesSelect";
import { PokemonListPageState } from "@/features/pokemon-list/PokemonListPage";

export const PokemonListFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useLocation();
  const { step } = (state || {}) as PokemonListPageState;

  const handleCleanFilters = () => {
    setSearchParams(new URLSearchParams(), { state });
  };

  return (
    <Card className="z-40 flex w-full flex-col items-center justify-center gap-4 py-4 sm:w-fit">
      <div className="flex w-full flex-row items-center justify-between">
        <span data-testid="selection-info">
          Selection du {step === "POKEMON_1" ? "premier" : "second"} Pokemon !
        </span>
        {searchParams.size > 0 && (
          <Button variant="secondary" onClick={handleCleanFilters}>
            <IoRefresh />
          </Button>
        )}
      </div>

      <div className="flex w-full flex-col items-center gap-4 md:flex-row">
        <FilterInput />
        <PokemonTypesSelect />
      </div>
    </Card>
  );
};
