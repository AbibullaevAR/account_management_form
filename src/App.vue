<template>
  <v-app theme="light">
    <v-main>
      <create-account-dialog v-model:modal-value="showCreateAccountDialog" />
      <account-list @create-new-account="showCreateAccountDialog = true" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CreateAccountDialog from '@/components/CreateAccountDialog.vue';
import AccountList from '@/components/AccountList.vue';

const showCreateAccountDialog = ref(false);

</script>
