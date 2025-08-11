import { expect, Page } from "@playwright/test";

export class PokemonFixture {
  private readonly page: Page;
  private readonly HOME_URL = "/";
  private readonly SELECTION_URL = "/selection";

  constructor(public readonly _page: Page) {
    this.page = _page;
  }

  async goToSelectionPage(cardNumber: 1 | 2) {
    const selectPokemonBtn1 = this.page.getByTestId(`select-pokemon-${cardNumber}`);
    await selectPokemonBtn1.click();
    expect(this.page.url()).toContain(this.SELECTION_URL);
  }

  async selectPokemon({ pokemonName, cardNumber }: { pokemonName: string; cardNumber: 1 | 2 }) {
    await expect(this.page.getByText(pokemonName, { exact: false })).toBeVisible();
    await this.page.getByText(pokemonName).click();
    await expect(this.page).toHaveURL(this.HOME_URL);

    const selectedCard = this.page.getByTestId(`small-card-POKEMON_${cardNumber}`);
    await expect(selectedCard).toContainText(pokemonName);
  }
}
