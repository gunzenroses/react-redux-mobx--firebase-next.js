const NavBarData = [
  {
    title: 'aboutUs',
    to: '/about',
  },
  {
    title: 'services',
    to: '/service',
    content: [
      {
        title: 'main',
        to: '/main',
      },
      {
        title: 'additional',
        to: '/additional',
      },
      {
        title: 'special',
        to: '/special',
      },
    ],
  },
  {
    title: 'vacancies',
    to: '/vacancies',
  },
  {
    title: 'news',
    to: '/news',
  },
  {
    title: 'agreements',
    to: '/agreements',
    content: [
      {
        title: 'userAgreement',
        to: '/user',
      },
      {
        title: 'generals',
        to: '/generals',
      },
    ],
  },
];

export { NavBarData };
