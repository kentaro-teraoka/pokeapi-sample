<template>
  <UForm @submit="() => fetchPokemon()" class="flex items-center gap-2">
    <UFormField name="idOrName">
      <UInput
        v-model="idOrName"
        type="search"
        placeholder="ID or name" />
    </UFormField>
    <UButton type="submit">Search</UButton>
  </UForm>
</template>

<script setup lang="ts">
const { idOrName, fetchPokemon } = usePokemon();
</script>