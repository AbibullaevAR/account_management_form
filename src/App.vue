<template>
  <v-app theme="light">
    <v-main>
      <account-list />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AccountList from '@/components/AccountList.vue';

</script>
