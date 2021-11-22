import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, payload) => {
      const { email, password } = payload.payload;
      if (email !== 'example@example.com' || password !== 'password') {
        state.isAuthenticated = false;
      } else {
        state.isAuthenticated = true;
      }
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login, setIsAuthenticated } = counterSlice.actions;

export default counterSlice.reducer;
