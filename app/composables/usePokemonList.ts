import type { PaginatedPokemonSummaryList } from '~/types/pokeapi';

export const usePokemonList = () => {
  const route = useRoute();

  const offset = ref<number>(Number(route.query.offset) || 0);
  const limit = ref<number>(Number(route.query.limit) || 20);

  const {
    data,
    pending,
    error,
    execute,
  } = useAsyncData<PaginatedPokemonSummaryList>(
    () => `pokemon-list-fetch-${offset.value}-${limit.value}`,
    async () => {
      // 1000 ~ 3000msの遅延
      const delay = Math.floor(Math.random() * 2000) + 1000
      await new Promise((resolve) => setTimeout(resolve, delay));

      return await $fetch<PaginatedPokemonSummaryList>(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset.value}&limit=${limit.value}`
      );
    },
    { immediate: false }
  );

  return {
    offset,
    limit,
    pokemonListData: data,
    pokemonListPending: pending,
    pokemonListError: error,
    fetchPokemonList: execute,
  };
};