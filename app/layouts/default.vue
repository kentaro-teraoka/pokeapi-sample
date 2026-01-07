<template>
  <UApp>
    <Header />
    <UContainer>
      <slot />
    </UContainer>
  </UApp>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue';
</script>