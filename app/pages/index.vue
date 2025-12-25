<template>
  <div class="space-y-6">
    <UForm @submit="() => fetchPokemon()" class="space-y-4">
      <UFormField label="ID or Name" name="idOrName">
        <UInput
          v-model="idOrName"
          type="search"
          placeholder="ID or Name" />
      </UFormField>
  
      <UButton type="submit">Fetch Pokemon</UButton>
    </UForm>

    <div v-if="pokemonPending">Loading...</div>
  
    <div v-if="pokemonError">Error: {{ pokemonError }}</div>
  
    <div v-if="pokemonData">
      <h2>{{ pokemonData.name }}</h2>
      <img class="pokemon-img" :src="pokemonData.sprites.front_default" />
    </div>
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