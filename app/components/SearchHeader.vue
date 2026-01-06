<template>
  <UForm @submit="onSearch" class="flex items-center gap-2">
    <UFormField name="idOrName">
      <UInput
        v-model="idOrName"
        type="search"
        placeholder="ID or name" />
    </UFormField>
    <UButton
      type="submit"
      :loading="pokemonPending">Search</UButton>
  </UForm>
</template>

<script setup lang="ts">
const router = useRouter();
const { idOrName, pokemonPending } = usePokemon();

const onSearch = async() => {
  router.push(`/pokemon/${idOrName.value}`);
};
</script>