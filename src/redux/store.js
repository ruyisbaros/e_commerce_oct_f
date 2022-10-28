import { configureStore } from "@reduxjs/toolkit";
import adminRolesSlicer from "./adminRolesSlicer";
import adminUsersSlicer from "./adminUsersSlicer";
import cartBoxSlicer from "./cartBoxSlicer";
import loadSlicer from "./loadSlicer";
import loggedUserSlicer from "./loggedUserSlicer";

export const store = configureStore({
  reducer: {
    currentUser: loggedUserSlicer,
    users: adminUsersSlicer,
    rolesContext: adminRolesSlicer,
    loadStatus: loadSlicer,
    cartBox: cartBoxSlicer,
  },
});
