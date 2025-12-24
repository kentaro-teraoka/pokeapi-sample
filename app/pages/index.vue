<template>
  <input
    type="text"
    v-model="idOrName"
    placeholder="ID or Name" />
  <button @click="fetchPokemon">Fetch Pokemon</button>

  <div v-if="pokemon">
    <h2>pokemon.name: {{ pokemon.name }}</h2>
    <img class="pokemon-img" :src="pokemon.sprites.front_default" />
  </div>
</template>

<script setup lang="ts">
import type { PokemonDetail } from '~/types/pokeapi';

const idOrName = ref<string>("");
const pokemon = ref<PokemonDetail | null>(null);

const fetchPokemon = async () => {
  if (!idOrName.value) {
    alert("Please enter an ID or Name");
    return;
  }

  try {
    const res = await $fetch<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${idOrName.value}`);
    pokemon.value = res;
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to fetch Pokemon");
  }
};
</script>

<style scoped>
.pokemon-img {
  width: 100%;
  max-width: 500px;
  height: auto;
}
</style>