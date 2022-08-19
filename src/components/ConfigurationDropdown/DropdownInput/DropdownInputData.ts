import { Props as ListItemsProps } from '../ListItem/ListItem';

type TemplateConfiguration = {
  list: ListItemsProps[];
  templates: string[][];
  default: string;
};

type DropdownData = {
  rooms: TemplateConfiguration;
  guests: TemplateConfiguration;
};

const dropdownData: DropdownData = {
  rooms: {
    list: [
      { text: 'bedrooms', value: 0, id: 'bedrooms', minValue: 0, maxValue: 5 },
      { text: 'beds', value: 0, id: 'beds', minValue: 0, maxValue: 5 },
      {
        text: 'bathrooms',
        value: 0,
        id: 'bathrooms',
        minValue: 0,
        maxValue: 5,
      },
    ],
    templates: [['bedrooms'], ['beds'], ['bathrooms']],
    default: 'defaultRoom',
  },

  guests: {
    list: [
      { text: 'adults', value: 0, id: 'adults', minValue: 0, maxValue: 5 },
      { text: 'kids', value: 0, id: 'kids', minValue: 0, maxValue: 5 },
      { text: 'babies', value: 0, id: 'baby', minValue: 0, maxValue: 5 },
    ],
    templates: [['guests'], ['babies']],
    default: 'defaultGuests',
  },
};

export { dropdownData };
export type { TemplateConfiguration };
