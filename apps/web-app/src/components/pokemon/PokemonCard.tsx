import { Pokemon } from "@getvirtualbrain-technical-test/shared-types";
import { FC, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PokemonTypeImage } from "@/components/pokemon/PokemonTypeImage";
import { PokemonListPageState } from "@/features/pokemon-list/PokemonListPage";

type PokemonCardProps = {
  pokemon: Pokemon;
};

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 100,
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

export const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const { name, apiTypes, pokedexId, stats, image } = pokemon;
  const { state = {} } = useLocation();
  const { step, ...homePageState } = state as PokemonListPageState;
  const navigate = useNavigate();

  const handleSelectPokemon = () => {
    if (step === "POKEMON_1") {
      navigate("/", { state: { ...homePageState, pokemon1: pokemon } });
    } else if (step === "POKEMON_2") {
      navigate("/", { state: { ...homePageState, pokemon2: pokemon } });
    }
  };

  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      setRotate({ x: rotateX, y: rotateY });
    }),
    [],
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={handleSelectPokemon}
      className="relative h-[300px] w-[300px] cursor-pointer overflow-hidden rounded-full border-2 border-black bg-white transition-transform duration-300 [clip-path:circle(50%)] hover:scale-105"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
        transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
      }}
      data-testid={`card-${name}`}
    >
      <div className="absolute left-0 top-0 h-1/2 w-full bg-red-600" />
      <div className="absolute left-0 top-1/2 h-[24px] w-full -translate-y-1/2 bg-black" />
      <div className="absolute left-1/2 top-1/2 flex size-[240px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black">
        <div className="flex size-[200px] flex-col items-center rounded-full bg-white pt-4">
          <img src={image} alt={name} className="absolute -top-6 size-[140px]" />
          <div className="absolute top-[110px] flex flex-row gap-1">
            {apiTypes.map((pokemonType) => (
              <PokemonTypeImage key={pokemonType.name} pokemonType={pokemonType} />
            ))}
          </div>
          <div className="text-md absolute top-[126px] font-bold text-black">
            {name} ({pokedexId})
          </div>
          <table className="absolute top-[148px] mt-1 border-collapse text-right text-sm">
            <tbody className="leading-3.5">
              <tr>
                <td>HP:</td>
                <td className="pl-1 font-bold">{stats.HP}</td>
              </tr>
              <tr>
                <td>Attack:</td>
                <td className="pl-1 font-bold">{stats.attack}</td>
              </tr>
              <tr>
                <td>Defense:</td>
                <td className="pl-1 font-bold">{stats.defense}</td>
              </tr>
              <tr>
                <td>Speed:</td>
                <td className="pl-1 font-bold">{stats.speed}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
