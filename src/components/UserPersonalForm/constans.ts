type ItemList = {
  key: keyof UserType | 'password';
  label: string;
};

const itemList: ItemList[] = [
  { key: 'email', label: 'Email' },
  { key: 'password', label: 'Пароль' },
  { key: 'name', label: 'Имя' },
  { key: 'surname', label: 'Фамилия' },
  { key: 'gender', label: 'Пол' },
  { key: 'birthday', label: 'День рождения' },
];

export { itemList };
