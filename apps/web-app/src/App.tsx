import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Route, Routes} from "react-router-dom";

import {ThemeProvider} from "./components/theme/ThemeContext";
import {Layout} from "./components/ui/Layout";
import {NotFoundPage} from "./features/NotFoundPage.tsx";
import PokemonListPage from "./features/pokemon-list/PokemonListPage";

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<PokemonListPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
