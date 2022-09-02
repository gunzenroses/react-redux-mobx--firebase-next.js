const NavBarData = [
  {
    title: 'О нас',
    to: '/about',
  },
  {
    title: 'Услуги',
    to: '/service',
    content: [
      {
        title: 'Основные',
        to: '/main',
      },
      {
        title: 'Дополнительные',
        to: '/additional',
      },
      {
        title: 'Особые',
        to: '/special',
      }
    ],
  },
  {
    title: 'Вакансии',
    to: '/vacancies',
  },
  {
    title: 'Новости',
    to: '/news',
  },
  {
    title: 'Соглашения',
    to: '/agreements',
    content: [
      {
        title: 'Пользовательское соглашение',
        to: '/user',
      },
      {
        title: 'Общие условия',
        to: '/generals',
      },
    ],
  },
];

export { NavBarData };