import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";
import DoctorSlice from "../slices/DoctorSlice";
export const rootReducer = combineReducers({
  UserSlice,
  DoctorSlice,
});
export type RootState = ReturnType<typeof rootReducer>;