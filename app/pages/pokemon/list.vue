<template>
  <div v-if="pokemonListPending">Loading...</div>
  <div v-else-if="pokemonListError">Error: {{ pokemonListError }}</div>
  <div v-else>
    <ul>
      <li v-for="pokemon in pokemonListData?.results" :key="pokemon.name">
        <NuxtLink :to="`/pokemon/${pokemon.name}`">
          {{ pokemon.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>

  <div v-if="pokemonListData?.count">
    <UPagination
      v-model:page="pageNum"
      :items-per-page="itemsPerPage"
      :total="pokemonListData?.count" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const { offset, limit, pokemonListData, pokemonListPending, pokemonListError, fetchPokemonList } = usePokemonList();
const pageNum = ref<number>(1);
const itemsPerPage = 20;

onMounted(async() => {
  // queryを更新する
  if(!route.query.offset || !route.query.limit) {
    router.replace({
      query: {
        offset: offset.value.toString(),
        limit: limit.value.toString(),
      },
    });
  }

  // ページ番号を更新する
  pageNum.value = Math.floor(offset.value / itemsPerPage) + 1;

  await fetchPokemonList();
});

/**
 * pageNumが変わったら
 * 1. offsetとlimit(とquery)を更新する
 * 2. リストを再取得する
 */
watch(
  () => pageNum.value,
  async (newPage) => {
    offset.value = (newPage - 1) * itemsPerPage;
    limit.value = itemsPerPage;

    router.replace({
      query: {
        offset: offset.value.toString(),
        limit: limit.value.toString(),
      },
    });

    await fetchPokemonList();
  }
);
</script>