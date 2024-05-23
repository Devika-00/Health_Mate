import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";
import DoctorSlice from "../slices/DoctorSlice";
import AdminSlice from "../slices/AdminSlice";
export const rootReducer = combineReducers({
  UserSlice,
  DoctorSlice,
  AdminSlice,
});
export type RootState = ReturnType<typeof rootReducer>;