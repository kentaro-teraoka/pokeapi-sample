<template>
  <UHeader>
    <template #title>
      PokeAPI Sample
    </template>

    <UNavigationMenu :items="navigationItems" />

    <template #right>
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

    <template #body>
      <UNavigationMenu :items="navigationItems" orientation="vertical" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();
const router = useRouter();
const { idOrName, pokemonPending } = usePokemon();

const navigationItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Top',
    to: '/',
    icon: 'i-lucide-house',
    active: route.path === '/',
  },
  {
    label: 'List',
    to: '/pokemon/list',
    icon: 'i-lucide-list',
    active: route.path.startsWith('/pokemon/list'),
  },
])

const onSearch = async() => {
  router.push(`/pokemon/${idOrName.value}`);
};
</script>