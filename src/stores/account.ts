import { defineStore } from "pinia";
import { computed } from "vue";
import type { Account } from "./types";

const ACCOUNTS_KEY_IN_STORE = 'accounts';

export const useAccountStore = defineStore('account', () => {
  const accounts = computed(() => {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY_IN_STORE) || '[]') as Account[];
    return accounts;
  });

  const saveAccounts = (accounts: Account[]) => {
    localStorage.setItem(ACCOUNTS_KEY_IN_STORE, JSON.stringify(accounts));
  }

  return { accounts, saveAccounts }
});