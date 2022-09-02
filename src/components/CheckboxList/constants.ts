import { Props as CheckboxProps } from 'components/Checkbox/Checkbox';

const accessibilityData: CheckboxProps[] = [
  {
    titleText: 'Широкий коридор',
    text: 'Ширина коридоров в номере не менее 91 см.',
    checked: false,
    isShort: true,
    name: 'wideCorridor',
  },
  {
    titleText: 'Помощник для инвалидов',
    text: 'На 1 этаже вас встретит специалист  и проводит до номера.',
    checked: false,
    name: 'assistant',
  },
];

const additionalFacilitiesData: CheckboxProps[] = [
  { text: 'Завтрак', name: 'breakfast', checked: false },
  { text: 'Письменный стол', name: 'writingDesk', checked: false },
  { text: 'Стул для кормления', name: 'feedingChair', checked: false },
  { text: 'Кроватка', name: 'crib', checked: false },
  { text: 'Телевизор', name: 'tv', checked: false },
  { text: 'Шампунь', name: 'shampoo', checked: false },
];

const rulesData: CheckboxProps[] = [
  { text: 'Можно курить', checked: false, name: 'allowSmoke' },
  { text: 'Можно с питомцами', checked: false, name: 'allowPets' },
  {
    text: 'Можно пригласить гостей (до 10 человек)',
    checked: false,
    name: 'allowGuests',
  },
];

export { accessibilityData, additionalFacilitiesData, rulesData };