import {FC, HTMLAttributes} from "react";

type CardProps = HTMLAttributes<HTMLDivElement> &{}

export const Card: FC<CardProps> = ({className = "", ...props}) => {
  return (
    <div className={`shadow-xl bg-white/80 dark:bg-gray-800/90 dark:text-gray-200 backdrop-blur border border-gray-300 gap-4 flex flex-col rounded-md px-2 sm:p-4 ${className}`} {...props} />
  )
}
