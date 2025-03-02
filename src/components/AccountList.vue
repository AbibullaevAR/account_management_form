<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center">
        Управление учетными записями
        <v-btn color="primary" @click="emit('createNewAccount')">+</v-btn>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="account in accounts" :key="account.id">
            <v-row justify="center">
              <v-col cols="3">
                <v-text-field
                  :value="account.label.join(';')"
                  label="Метка"
                  :rules="[v => v.length <= 50 || 'Максимум 50 символов']"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="account.type"
                  :items="['LDAP', 'Локальная']"
                  label="Тип записи"
                 
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="account.login"
                  label="Логин"
                  :rules="[v => !!v || 'Обязательное поле', v => v.length <= 100 || 'Максимум 100 символов']"
                  
                ></v-text-field>
              </v-col>
              <v-col cols="3" v-if="account.type === 'Локальная'">
                <v-text-field
                  v-model="account.password"
                  label="Пароль"
                  type="password"
                  :rules="[v => !!v || 'Обязательное поле', v => v.length <= 100 || 'Максимум 100 символов']"
                  
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn color="red">Удалить</v-btn>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: 'createNewAccount'): void
}>();

const accounts = [
  {
    id: 0,
    label: ['1234', 'test'],
    type: 'Локальная',
    login: 'tttt',
    password: 't',
  },
  {
    id: 1,
    label: ['1234', 'test'],
    type: 'Локальная',
    login: 'tttt',
    password: 't',
  },
  {
    id: 2,
    label: ['1234', 'test'],
    type: 'Локальная',
    login: 'tttt',
    password: 't',
  }
]
</script>