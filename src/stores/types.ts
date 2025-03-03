export type AccountType = 'LDAP' | 'Локальная';

export interface Account {
  label: { text: string }[];
  type: AccountType;
  login: string;
  password: null | string;
};

