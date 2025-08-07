import {FC, HTMLAttributes} from "react";

type CardProps = HTMLAttributes<HTMLDivElement> &{}

export const Card: FC<CardProps> = ({className = "", ...props}) => {
  return (
    <div className={`shadow-xl bg-white/90 backdrop-blur border border-gray-300 gap-4 flex flex-col rounded-md p-4 ${className}`} {...props} />
  )

}
