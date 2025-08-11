import { FC, HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {};

export const Card: FC<CardProps> = ({ className = "", ...props }) => {
  return (
    <div
      className={`flex flex-col gap-4 rounded-md border border-gray-300 bg-white/80 px-2 shadow-xl backdrop-blur sm:p-4 dark:bg-gray-800/90 dark:text-gray-200 ${className}`}
      {...props}
    />
  );
};
