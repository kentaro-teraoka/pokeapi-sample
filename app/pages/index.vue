<template>
  <input
    type="text"
    v-model="idOrName"
    placeholder="ID or Name"
  />
  <button @click="() => fetchPokemon()">Fetch Pokemon</button>

  <div v-if="pokemonPending">Loading...</div>

  <div v-if="pokemonError">Error: {{ pokemonError }}</div>

  <div v-if="pokemonData">
    <h2>{{ pokemonData.name }}</h2>
    <img class="pokemon-img" :src="pokemonData.sprites.front_default" />
  </div>
</template>

<script setup lang="ts">
const { idOrName, pokemonData, pokemonPending, pokemonError, fetchPokemon } = usePokemon();
</script>

<style scoped>
.pokemon-img {
  width: 100%;
  max-width: 500px;
  height: auto;
}
</style>