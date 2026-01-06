<template>
  <UApp>
    <SearchHeader />
    <slot />
  </UApp>
</template>

<script setup lang="ts">
import SearchHeader from '~/components/SearchHeader.vue';
</script>