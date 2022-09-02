import { makeAutoObservable, runInAction } from 'mobx';

import ApiBooking from '../../firebase/Api/ApiBooking';

const initialState: Bookings = {
  bookings: [],
  bookingStatus: 'idle',
};

class BookingStore {
  bookings: BookingData[];

  bookingStatus: BookingStatus;

  constructor(bookingState: Bookings) {
    makeAutoObservable(this);
    this.bookings = bookingState.bookings;
    this.bookingStatus = 'idle';
  }

  setStatus(newBookingStatus: BookingStatus) {
    this.bookingStatus = newBookingStatus;
  }

  getStatus(): BookingStatus {
    return this.bookingStatus;
  }

  async addBooking({ id, booking }: { id: string; booking: BookingData }) {
    try {
      const newBooking = await new ApiBooking().addBookingInfo(id, booking);
      this.bookings.push(newBooking);
      runInAction(() => {
        this.bookingStatus = 'fulfilled';
      });
    } catch (error: any) {
      console.error(error.message);
      runInAction(() => {
        this.bookingStatus = 'rejected';
      });
    }
  }

  async removeBooking({ id, data }: { id: string; data: BookingData }) {
    try {
      await new ApiBooking().removeBookingInfo(id, data).then(() => {
        const newBookings = this.bookings.filter(
          (item) => item.number !== data.number
        );
        runInAction(() => {
          this.bookings = newBookings;
          this.bookingStatus = 'fulfilled';
        });
      });
    } catch (error: any) {
      console.error(error.message);
      runInAction(() => {
        this.bookingStatus = 'rejected';
      });
    }
  }

  async getBooking(id: string) {
    try {
      const newBookings = await new ApiBooking().getBookingInfo(id);
      runInAction(() => {
        this.bookings = newBookings;
        this.bookingStatus = 'fulfilled';
      });
    } catch (error: any) {
      console.error(error.message);
      runInAction(() => {
        this.bookingStatus = 'rejected';
      });
    }
  }
}

const bookingStore = new BookingStore(initialState);

export { bookingStore, BookingStore };
