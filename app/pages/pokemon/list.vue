<template>
  <div v-if="pokemonListWithDetailPending">Loading...</div>
  <div v-else-if="pokemonListWithDetailError">Error: {{ pokemonListWithDetailError }}</div>
  <div v-else>
    <ul>
      <li v-for="pokemonDetail in pokemonListDataWithDetail" :key="pokemonDetail.name">
        <NuxtLink :to="`/pokemon/${pokemonDetail.name}`">
          <img v-if="pokemonDetail?.sprites.front_default" :src="pokemonDetail.sprites.front_default" />
          No.{{ pokemonDetail.id }}
          {{ pokemonDetail.name }}
          <span v-for="t in pokemonDetail?.types" :key="t.slot" class="px-1 bg-neutral-300 text-black">
            {{ t.type.name }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>

  <div v-if="pokemonListDataWithDetail?.length">
    <UPagination
      v-model:page="pageNum"
      :items-per-page="itemsPerPage"
      :total="pokemonListData?.count" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const { offset, limit, pokemonListData, fetchPokemonList } = usePokemonList();
const { pokemonListDataWithDetail, pokemonListWithDetailPending, pokemonListWithDetailError, fetchPokemonListWithDetail } = usePokemonListWithDetail(pokemonListData);

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
  await fetchPokemonListWithDetail();
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
    await fetchPokemonListWithDetail();
  }
);
</script>