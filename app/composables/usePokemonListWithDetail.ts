import type { PaginatedPokemonSummaryList, PokemonDetail } from '~/types/pokeapi';

export const usePokemonListWithDetail = (pokemonListData: Ref<PaginatedPokemonSummaryList | null>) => {
  const route = useRoute();

  const {
    data,
    pending,
    error,
    execute,
  } = useAsyncData<PokemonDetail[]>(
    () => `pokemon-list-fetch-${route.query.offset}-${route.query.limit}-with-detail`,
    async () => {
      console.log("route.query.offset:", route.query.offset);
      console.log("pokemonListData:", pokemonListData.value?.results);

      // 1000 ~ 3000msの遅延
      const delay = Math.floor(Math.random() * 2000) + 1000
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (!pokemonListData.value?.results?.length) {
        return [];
      }

      const pokemonDetails = await Promise.all(
        pokemonListData.value.results.map(async (pokemon) => {
          return await $fetch<PokemonDetail>(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
        })
      );

      return pokemonDetails;
    },
    { immediate: false }
  );

  return {
    pokemonListDataWithDetail: data,
    pokemonListWithDetailPending: pending,
    pokemonListWithDetailError: error,
    fetchPokemonListWithDetail: execute,
  };
};