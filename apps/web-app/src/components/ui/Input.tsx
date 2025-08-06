import {FC, InputHTMLAttributes} from "react";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {

}

export const Input: FC<InputProps> = ({ ...inputProps}) => {
  return (
    <input
      {...inputProps}
      className="border border-amber-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:text-amber-50"
    />
  )
}
