import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Route, Routes} from "react-router-dom";

import {ThemeProvider} from "./components/theme/ThemeContext";
import {Layout} from "./components/ui/Layout";
import {BattlePage} from "./features/battle/BattlePage.tsx";
import {HomePage} from "./features/home/HomePage.tsx";
import {NotFoundPage} from "./features/NotFoundPage.tsx";
import PokemonListPage from "./features/pokemon-list/PokemonListPage";

const queryClient = new QueryClient()

export const RouterPaths = {
  HOME: "/",
  POKEMON_SELECTION: "/selection",
  BATTLE: "/battle", // Il faudrait améliorer la gestion des routes pour intégrer les variables de route
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path={RouterPaths.HOME} element={<HomePage />} />
            <Route path={RouterPaths.POKEMON_SELECTION} element={<PokemonListPage />} />
            <Route path={`${RouterPaths.BATTLE}/:names`} element={<BattlePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
