<template>
  <v-container>
    <v-dialog
      :model-value="modalValue"
      @update:model-value="(value) => emit('update:modalValue', value)"
      max-width="500px"
    >
      <v-card>
        <v-card-title>Добавить учетную запись</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field label="Метка"></v-text-field>
            <v-select :items="['LDAP', 'Локальная']" label="Тип записи"></v-select>
            <v-text-field label="Логин" required></v-text-field>
            <v-text-field label="Пароль" type="password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="emit('update:modalValue', false)">Отмена</v-btn>
          <v-btn color="primary">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
defineProps<{
  modalValue: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modalValue', value: boolean): void
}>();
</script>