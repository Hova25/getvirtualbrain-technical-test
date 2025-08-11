import { FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`max-h-[42px] rounded-md border border-amber-300 bg-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:bg-gray-900 dark:text-amber-50 ${className}`}
    />
  );
};
