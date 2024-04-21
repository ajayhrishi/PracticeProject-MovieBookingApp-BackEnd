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

const loginSlice = createSlice({
  name: "login",
  initialState: { loginErrors : "" },
  reducers: {
    setLoginError(state,action) {
      state.loginErrors = action.payload;
    },
    removeLoginError(state) {
      state.loginErrors = false;
    },
  },
});

export const adminActions = adminSlice.actions;
export const userActions = userSlice.actions;
export const loginActions = loginSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
    login: loginSlice.reducer
  },
});
