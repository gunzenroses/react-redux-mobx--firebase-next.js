import { createSlice } from '@reduxjs/toolkit';

import {
  createUser,
  getUser,
  updateUser,
  removeLike,
  setLike,
} from '../thunks/users';

const initialState: UserType = {
  id: '',
  name: '',
  surname: '',
  email: '',
  birthday: '',
  gender: '',
  getSpecOffers: false,
  likes: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.likes = action.payload.likes;
    },
    removeUser(state) {
      state.email = '';
      state.id = '';
      state.name = '';
      state.surname = '';
      state.likes = [];
    },
    changeUserLikes(state, action) {
      state.likes = action.payload.likes;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.surname = action.payload.surname;
        state.email = action.payload.email;
        state.birthday = action.payload.birthday;
        state.gender = action.payload.gender;
        state.getSpecOffers = action.payload.getSpecOffers;
        state.likes = action.payload.likes;
      })
      .addCase(getUser.rejected, () => {
        console.error('Ошибка входа');
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.surname = action.payload.surname;
        state.likes = action.payload.likes;
      })
      .addCase(createUser.rejected, () => {
        console.error('Ошибка регистрации');
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.surname = action.payload.surname;
      })
      .addCase(updateUser.rejected, () => {
        console.error('Ошибка обновления');
      })
      .addCase(setLike.fulfilled, (state, action) => {
        state.likes = [...action.payload];
        window.localStorage.setItem(
          'user',
          JSON.stringify({
            email: state.email,
            id: state.id,
            name: state.name,
            likes: state.likes,
            surname: state.surname,
          })
        );
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        state.likes = [...action.payload];
        window.localStorage.setItem(
          'user',
          JSON.stringify({
            email: state.email,
            id: state.id,
            name: state.name,
            likes: state.likes,
            surname: state.surname,
          })
        );
      });
  },
});

export const { setUser, removeUser, changeUserLikes } = userSlice.actions;
export default userSlice.reducer;
