import { action, makeObservable, observable, runInAction } from 'mobx';

const initialState: Filters = {
  accessibility: {
    wideCorridor: false,
    assistant: false,
  },
  additionalFacilities: {
    breakfast: false,
    crib: false,
    feedingChair: false,
    shampoo: false,
    tv: false,
    writingDesk: false,
  },
  freeDays: {
    from: null,
    to: null,
  },
  guests: { kids: 0, adults: 0, baby: 0 },
  price: { from: 5000, to: 10000 },
  roomAmenities: { bedrooms: 0, beds: 0, bathrooms: 0 },
  rules: { allowGuests: false, allowSmoke: false, allowPets: false },
};

class SearchFiltersStore {
  filters: Filters;

  constructor(searchFiltersState: Filters) {
    makeObservable(this, {
      filters: observable,
      updateAccessibility: action,
      updateAdditionalFacilities: action,
      updateFreeDays: action,
      updateGuests: action,
      updatePrice: action,
      updateRoomAmenities: action,
      updateRules: action,
    });
    this.filters = searchFiltersState;
  }

  updateAccessibility(newAccessibility: { [itemId: string]: boolean }) {
    runInAction(() => {
      this.filters = {
        ...this.filters,
        accessibility: {
          ...this.filters.accessibility,
          ...newAccessibility,
        },
      };
    });
  }

  updateAdditionalFacilities(newAdditionalFacilities: {
    [itemId: string]: boolean;
  }) {
    runInAction(() => {
      this.filters = {
        ...this.filters,
        additionalFacilities: {
          ...this.filters.additionalFacilities,
          ...newAdditionalFacilities,
        },
      };
    });
  }

  updateFreeDays(newFreeDays: FreeDays) {
    runInAction(() => {
      this.filters = {
        ...this.filters,
        freeDays: newFreeDays,
      };
    });
  }

  updateGuests(newGuests: Guests) {
    runInAction(() => {
      this.filters = {
        ...this.filters,
        guests: newGuests,
      };
    });
  }

  updatePrice(newPrice: Price) {
    runInAction(() => {
      this.filters = {
        ...this.filters,
        price: newPrice,
      };
    });
  }

  updateRoomAmenities(newRoomAmenities: RoomAmenities) {
    runInAction(() => {
      this.filters = {
        ...this.filters,
        roomAmenities: newRoomAmenities,
      };
    });
  }

  updateRules(newRules: { [itemId: string]: boolean }) {
    runInAction(() => {
      this.filters = {
        ...this.filters,
        rules: { ...this.filters.rules, ...newRules },
      };
    });
  }
}

const searchFiltersStore = new SearchFiltersStore(initialState);

export { searchFiltersStore };
