import {expect, Page, test} from '@playwright/test';
import {PokemonFixture} from "@tests/PokemonFixture";

const HOME_URL = "/"
const SELECTION_URL = "/selection";
const BATTLE_URL = "/battle";
const START_BATTLE_BUTTON = "Lancer le combat !"

test.describe.configure({mode: "serial"});

let page: Page;
let pokemonFixture: PokemonFixture;

test.beforeAll(async ({browser}) => {
  page = await browser.newPage();
  pokemonFixture = new PokemonFixture(page)
})

test('Should go to home page', async () => {
  await page.goto(HOME_URL);
  const title = page.getByTestId('title');
  await expect(title).toContainText("Combat Pokémon par IA")
});

test('Should not allow user to start fight if no pokemons are selected', async () => {
  const selectPokemonBtn1 = page.getByTestId('select-pokemon-1');
  await expect(selectPokemonBtn1).toBeVisible();
  const selectPokemonBtn2 = page.getByTestId('select-pokemon-2');
  await expect(selectPokemonBtn2).toBeVisible();
  // Fixture
  const startButton = page.getByText(START_BATTLE_BUTTON);
  await expect(startButton).toBeDisabled();
});

test('Should go to selection page when user wants to choose a first pokemon', async () => {
  await pokemonFixture.goToSelectionPage(1)
});

test('Should select a first pokemon', async () => {
  await pokemonFixture.selectPokemon({pokemonName: "Bulbizarre", cardNumber: 1})
});

test('Should not be allow to start fight if only one pokemon is selected', async () => {
  const startButton = page.getByText(START_BATTLE_BUTTON);
  await expect(startButton).toBeDisabled();
});

test('Should go to selection page when user wants to choose a second pokemon', async () => {
  await pokemonFixture.goToSelectionPage(2)
});

test('Should select a second pokemon', async () => {
  await pokemonFixture.selectPokemon({pokemonName: "Salamèche", cardNumber: 2})
});

test('Should allow user to choose another pokemon', async () => {
  const refreshPokemon1 = page.getByTestId(`small-card-POKEMON_1`).getByRole("link");
  await refreshPokemon1.click()
  expect(page.url()).toContain(SELECTION_URL);
});

test('Should search a pokemon by name', async () => {
  const filterSearchInput = page.getByRole("textbox", { name: "Nom du pokémon" });
  await filterSearchInput.fill("draca")

  const pokemonList = page.getByTestId('pokemon-list');
  await expect(pokemonList).toHaveCount(1);
  const dracaufeu = pokemonList.getByText("Dracaufeu", {exact: false});
  await expect(dracaufeu).toBeVisible();
  await filterSearchInput.fill("")
});

test('Should select a pokemon by category ', async () => {
  const filterSearchInput = page.getByLabel("Selectionnez un type de pokémon");
  await filterSearchInput.click()
  await page.getByText('Poison').click();
  await page.getByText('Il n\'y a pas de pokémon pour cette recherche');
  await filterSearchInput.click()
  await page.getByText('Feu').click();
  const pokemonList = page.getByTestId('pokemon-list');
  const dracaufeu = pokemonList.getByText("Dracaufeu", {exact: false});
  await expect(dracaufeu).toBeVisible();
  await dracaufeu.click()
  expect(page.url()).toContain(HOME_URL);
});

test('Should start battle when user clicks on fight button', async () => {
  const startButton = page.getByText(START_BATTLE_BUTTON);
  await startButton.click();
  expect(page.url()).toContain(BATTLE_URL);
});
