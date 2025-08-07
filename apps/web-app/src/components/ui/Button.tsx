import {ButtonHTMLAttributes, FC} from "react";
import {tv, VariantProps} from "tailwind-variants";

const buttonVariants = tv({
  base: 'font-semibold py-2 px-4 text-center rounded-lg shadow transition cursor-pointer',
  variants: {
    variant: {
      primary: 'bg-blue-500 hover:bg-blue-700 text-white',
      secondary: 'text-gray-800 bg-amber-300 hover:bg-amber-400',
      tertiary: 'border border-gray-300 bg-white hover:bg-gray-50 '
    },
  },
  defaultVariants: {
    variant: 'primary'
  }
});

type ButtonVariants = VariantProps<typeof buttonVariants>

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants

export const Button: FC<ButtonProps> = ({className = "", variant,...props}) => {
  const buttonClassName = buttonVariants({className, variant});
  return (
    <button className={buttonClassName} {...props} />
  );
}
