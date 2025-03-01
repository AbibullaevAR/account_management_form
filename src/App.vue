<template>
  <v-app>
    <v-main>
      <v-text-field
        :rules="rules"
        hide-details="auto"
        label="Main input"
      ></v-text-field>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  const rules = [
    (value: string) => !!value,
  ]
</script>
