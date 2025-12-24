import type { PokemonDetail } from '~/types/pokeapi';

export const usePokemon = () => {
  const idOrName = ref<string>("");

  const {
    data,
    pending,
    error,
    execute,
  } = useAsyncData<PokemonDetail>(
    "pokemon-fetch",
    async () => {
      if (!idOrName.value) {
        throw new Error("ID or Name is required");
      }

      return await $fetch<PokemonDetail>(
        `https://pokeapi.co/api/v2/pokemon/${idOrName.value}`
      );
    },
    {
      immediate: false, // 初回は自動実行しない
    }
  );

  return {
    idOrName,
    pokemonData: data,
    pokemonPending: pending,
    pokemonError: error,
    fetchPokemon: execute,
  };
};