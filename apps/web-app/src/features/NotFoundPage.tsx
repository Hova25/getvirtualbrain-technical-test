import {Link} from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full  px-4">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">
        Oups... La page que vous cherchez n’existe pas.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-gray-800 bg-amber-300 rounded-lg shadow transition"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
