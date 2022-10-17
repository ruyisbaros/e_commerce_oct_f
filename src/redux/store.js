import { configureStore } from "@reduxjs/toolkit";
import loggedUserSlicer from "./loggedUserSlicer";

export const store = configureStore({
  reducer: {
    currentUser: loggedUserSlicer,
  },
});
