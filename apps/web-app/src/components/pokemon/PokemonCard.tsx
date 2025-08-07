import {Pokemon} from "@getvirtualbrain-technical-test/shared-types";
import {FC} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {PokemonListPageState} from "../../features/pokemon-list/PokemonListPage.tsx";

type PokemonCardProps = {
  pokemon: Pokemon
}

export const PokemonCard: FC<PokemonCardProps> = ({pokemon}) => {
  const {state = {}} = useLocation()
  const { step, ...homePageState } = state as PokemonListPageState;
  const navigate = useNavigate()

  const imageTypeWidth = 20;
  const totalWidth = pokemon.apiTypes.length * imageTypeWidth;
  const startX = 150 - totalWidth / 2;

  const handleSelectPokemon = () => {
    if(step === "POKEMON_1") {
      navigate("/", {state: { ...homePageState, pokemon1: pokemon }});
    } else if(step === "POKEMON_2") {
      navigate("/", {state: { ...homePageState, pokemon2: pokemon }});
    }
  }

  return(
    <div onClick={handleSelectPokemon} className="[clip-path:circle(50%)] cursor-pointer hover:scale-105 transition-transform duration-300">
      <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.6" y="0.6" width="298.8" height="298.8" rx="149.4" fill="white"/>
        <rect x="0.6" y="0.6" width="298.8" height="298.8" rx="149.4" stroke="black" strokeWidth="1.2"/>
        <path d="M0 150C0 67.1573 67.1573 0 150 0V0C232.843 0 300 67.1573 300 150V159H0V150Z" fill="#D90218"/>
        <rect y="138" width="300" height="24" fill="black"/>
        <g>
          <rect x="24.0002" y="24" width="252" height="252" rx="126" fill="white"/>
          <circle cx="150" cy="150" r="114" stroke="black" strokeWidth="24"/>

          <image
            href={pokemon.image}
            x="80"
            y="16"
            width="140"
            height="140"
          />
          <g>
            <g>
              {pokemon.apiTypes.map((t, index) => (
                <image
                  key={t.name}
                  href={t.image}
                  x={startX + index * imageTypeWidth}
                  y="150"
                  width={imageTypeWidth}
                  height="20"
                />
              ))}
            </g>
            <text x="150" y="180" fontWeight="600" textAnchor="middle" fontSize="14" fill="black">
              {pokemon.name}
            </text>
            <g>
              <text x="160" y="200" textAnchor="end" fontSize="16" fill="black">
              HP:
              </text>
              <text x="164" y="200" fontWeight="600" textAnchor="start" fontSize="14" fill="black">
                {pokemon.stats.HP}
              </text>
            </g>
            <g>
              <text x="160" y="212" textAnchor="end" fontSize="14" fill="black">
              Attack:
              </text>
              <text x="164" y="212" fontWeight="600" textAnchor="start" fontSize="14" fill="black">
                {pokemon.stats.attack}
              </text>
            </g>
            <g>
              <text x="160" y="224" textAnchor="end" fontSize="14" fill="black">
              Defense:
              </text>
              <text x="164" y="224" fontWeight="600" textAnchor="start" fontSize="14" fill="black">
                {pokemon.stats.defense}
              </text>
            </g>
            <g>
              <text x="160" y="236" textAnchor="end" fontSize="14" fill="black">
              Speed:
              </text>
              <text x="164" y="236" fontWeight="semibold" textAnchor="start" fontSize="14" fill="black">
                {pokemon.stats.speed}
              </text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
