import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId")
      state.isLoggedIn = false;
    },
  },
});

const adminSlice = createSlice({
  name: "admin",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("adminId")
      localStorage.removeItem("token")
      state.isLoggedIn = false;
    },
  },
});

const errorSlice = createSlice({
  name: "errors",
  initialState: { error : "" },
  reducers: {
    setError(state,action) {
      state.error = action.payload;
    },
    removeError(state) {
      state.error = false;
    },
  },
});

export const adminActions = adminSlice.actions;
export const userActions = userSlice.actions;
export const errorActions = errorSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
    errors: errorSlice.reducer
  },
});
