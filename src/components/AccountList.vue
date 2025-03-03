<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center">
        Управление учетными записями
        <v-btn color="primary" @click="handelAddNewAccount">+</v-btn>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(account, index) in accounts" :key="index">
            <v-row justify="center">
              <v-col cols="3" style="display: flex; align-items: center;">
                <v-tooltip text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" class="ml-2">mdi-help-circle-outline</v-icon>
                  </template>
                </v-tooltip>
                <v-text-field
                  :model-value="convertArrLabelsToString(account)"
                  label="Метка"
                  :rules="[v => v.length <= 50 || 'Максимум 50 символов']"
                  @update:model-value="(value) => handelUpdateLabel(account, value)"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select
                  :model-value="account.type"
                  :items="['LDAP', 'Локальная']"
                  label="Тип записи"
                  @update:model-value="(value) => handelUpdateAccountType(account, value)"
                ></v-select>
              </v-col>
              <v-col :cols="account.type === 'LDAP' ? 6 : 3">
                <v-text-field
                  :model-value="account.login"
                  label="Логин"
                  :rules="[v => !!v || 'Обязательное поле', v => v.length <= 100 || 'Максимум 100 символов']"
                  @update:model-value="(value) => handelUpdateLogin(account, value)"
                ></v-text-field>
              </v-col>
              <v-col cols="3" v-if="account.type === 'Локальная'">
                <v-text-field
                  :model-value="account.password"
                  label="Пароль"
                  type="password"
                  :rules="[v => !!v || 'Обязательное поле', v => v.length <= 100 || 'Максимум 100 символов']"
                  @update:model-value="(value) => handelUpdatePassword(account, value)"
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn color="red" @click="handelDeleteAccount(index)">Удалить</v-btn>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
import type { Account, AccountType } from '@/stores/types';
import { ref } from 'vue';

const accountStore = useAccountStore();

const accounts = ref(accountStore.accounts);

const convertArrLabelsToString = (account: Account) => {
  return account.label.map(item => item.text).join(';');
}

const saveToStore = () => {
  const savingAccounts = accounts.value.filter(item => (item.type === 'LDAP' || item.password?.length) && item.login.length);

  accountStore.saveAccounts(savingAccounts);
}

const handelUpdateLabel = (account: Account, strLabel: string) => {
  account.label = strLabel.split(';').map(label => {
    return {
      text: label
    }
  });

  saveToStore();
}

const handelUpdateAccountType = (account: Account, accountType: AccountType) => {
  if (accountType === 'LDAP') account.password = null;

  account.type = accountType;

  saveToStore();
}

const handelUpdateLogin = (account: Account, login: string) => {
  account.login = login;
  
  saveToStore();
}

const handelUpdatePassword = (account: Account, password: string) => {
  account.password = password;

  saveToStore();
}

const handelDeleteAccount = (deletedIndex: number) => {
  accounts.value = accounts.value.filter((_, index) => index !== deletedIndex);

  saveToStore();
}

const handelAddNewAccount = () => {
  accounts.value.push({
    label: [],
    type: 'Локальная',
    login: '',
    password: ''
  })
}

</script>