import {FC, InputHTMLAttributes} from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input: FC<InputProps> = ({className, ...props}) => {
  return (
    <input
      {...props}
      className={`border border-amber-300 bg-gray-200 dark:bg-gray-900 rounded-md p-2 max-h-[42px] focus:outline-none focus:ring-2 focus:ring-amber-600 dark:text-amber-50 ${className}`}
    />
  )
}
