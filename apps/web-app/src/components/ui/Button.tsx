import {ButtonHTMLAttributes, FC} from "react";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {

}

export const Button: FC<ButtonProps> = (props) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" {...props} />
  );
}
