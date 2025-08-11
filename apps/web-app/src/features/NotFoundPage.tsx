import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Oups... La page que vous cherchez n’existe pas.</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-amber-300 px-6 py-3 text-gray-800 shadow transition"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
};
