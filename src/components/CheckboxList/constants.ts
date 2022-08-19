import { Props as CheckboxProps } from 'components/Checkbox/Checkbox';

const accessibilityData: CheckboxProps[] = [
  {
    titleText: 'corridor',
    text: 'corridorDesc',
    checked: false,
    isShort: true,
    name: 'wideCorridor',
  },
  {
    titleText: 'assistant',
    text: 'assistantDesc',
    checked: false,
    name: 'assistant',
  },
];

const additionalFacilitiesData: CheckboxProps[] = [
  { text: 'breakfast', name: 'breakfast', checked: false },
  { text: 'writingDesk', name: 'writingDesk', checked: false },
  { text: 'feedingChair', name: 'feedingChair', checked: false },
  { text: 'crib', name: 'crib', checked: false },
  { text: 'tv', name: 'tv', checked: false },
  { text: 'shampoo', name: 'shampoo', checked: false },
];

const rulesData: CheckboxProps[] = [
  { text: 'allowSmoke', checked: false, name: 'allowSmoke' },
  { text: 'allowPets', checked: false, name: 'allowPets' },
  {
    text: 'allowGuests',
    checked: false,
    name: 'allowGuests',
  },
];

export { accessibilityData, additionalFacilitiesData, rulesData };
