import { Props as ListItemsProps } from "../ListItem/ListItem";

type TemplateConfiguration = {
  list: ListItemsProps[],
  templates: string[][];
  default: string;
}

type DropdownData = {
  rooms: TemplateConfiguration;
  guests: TemplateConfiguration;
}

const dropdownData: DropdownData = {
  rooms: {
    list: [
      { text: 'спальни', value: 0, id: 'bedrooms', minValue: 0, maxValue: 5 },
      { text: 'кровати', value: 0, id: 'beds', minValue: 0, maxValue: 5 },
      { text: 'ванные комнаты', value: 0, id: 'bathrooms', minValue: 0, maxValue: 5 },
    ],
    templates: [
      ['спал', 'ьня', 'ьни', 'ен'],
      ['кроват', 'ь', 'и', 'ей'],
      ['ванн', 'ая', 'ые', 'ых'],
    ],
    default: 'Конфигурация номера',
  },

  guests: {
    list: [
      { text: 'взрослые', value: 0, id: 'adults', minValue: 0, maxValue: 5 },
      { text: 'дети', value: 0, id: 'kids', minValue: 0, maxValue: 5 },
      { text: 'младенцы', value: 0, id: 'baby', minValue: 0, maxValue: 5 },
    ],
    templates: [
      ['гост', 'ь', 'я', 'ей'],
      ['младен', 'ец', 'ца', 'ев'],
    ],
    default: 'Сколько гостей',
  },
};

export { dropdownData };
export type { TemplateConfiguration };