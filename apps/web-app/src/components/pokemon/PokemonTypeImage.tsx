import { PokemonType } from "@getvirtualbrain-technical-test/shared-types";
import { FC, HTMLAttributes } from "react";

type PokemonTypeImageProps = {
  pokemonType: PokemonType;
} & Omit<HTMLAttributes<HTMLImageElement>, "src" | "alt">;

export const PokemonTypeImage: FC<PokemonTypeImageProps> = ({ pokemonType, ...imgProps }) => {
  const { name, image } = pokemonType;
  return <img src={image} alt={name} style={{ width: "20px" }} {...imgProps} />;
};
