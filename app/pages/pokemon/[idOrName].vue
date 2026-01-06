<template>
  <div v-if="pokemonPending">Loading...</div>
  <div v-else-if="pokemonError">Error: {{ pokemonError }}</div>
  <div v-else>
    <div class="flex gap-2 items-center">
      No.{{ pokemonData?.id }}
      <h2 class="font-bold">{{ pokemonData?.name }}</h2>
      <div class="flex gap-1 items-center">
        <span v-for="t in pokemonData?.types" :key="t.slot" class="px-1 bg-neutral-300 text-black">
          {{ t.type.name }}
        </span>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <img v-if="pokemonData?.sprites.front_default" :src="pokemonData.sprites.front_default" />
      <img v-if="pokemonData?.sprites.back_default" :src="pokemonData.sprites.back_default" />
    </div>
    <div class="space-y-2">
      <dl>
        <dt>Height:</dt>
        <dd>{{ pokemonData?.height }}</dd>
        <dt>Weight:</dt>
        <dd>{{ pokemonData?.weight }}</dd>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { idOrName, pokemonData, pokemonPending, pokemonError, fetchPokemon } = usePokemon();

onMounted(async() => {
  idOrName.value = route.params.idOrName as string;
  await fetchPokemon();
});

watch(
  () => pokemonError.value,
  (newVal) => {
    throw createError({
      statusCode: newVal?.statusCode || 500,
      message: newVal?.message || "",
      fatal: true,
    });
  }
);
</script>