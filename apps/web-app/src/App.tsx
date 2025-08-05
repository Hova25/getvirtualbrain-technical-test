import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {ThemeProvider} from "./components/theme/ThemeContext";
import PokemonListPage from "./features/pokemon-list/PokemonListPage";

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PokemonListPage/>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
