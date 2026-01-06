import type { PokemonDetail } from '~/types/pokeapi';

export const usePokemon = () => {
  const idOrName = ref<string>("");

  const {
    data,
    pending,
    error,
    execute,
  } = useAsyncData<PokemonDetail>(
    () => `pokemon-fetch-${idOrName.value}`,
    async () => {
      if (!idOrName.value) {
        throw new Error("ID or Name is required");
      }

      // 1000 ~ 3000msの遅延
      const delay = Math.floor(Math.random() * 2000) + 1000
      await new Promise((resolve) => setTimeout(resolve, delay));

      return await $fetch<PokemonDetail>(
        `https://pokeapi.co/api/v2/pokemon/${idOrName.value}`
      );
    },
    { immediate: false }
  );

  return {
    idOrName,
    pokemonData: data,
    pokemonPending: pending,
    pokemonError: error,
    fetchPokemon: execute,
  };
};