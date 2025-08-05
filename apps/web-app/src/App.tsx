import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {ThemeProvider} from "./components/theme/ThemeContext";
import {Layout} from "./components/ui/Layout";
import PokemonListPage from "./features/pokemon-list/PokemonListPage";

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Layout>
          <PokemonListPage/>
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
