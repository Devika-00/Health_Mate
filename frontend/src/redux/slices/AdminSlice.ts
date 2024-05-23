import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
    name: string | null;
    isAuthenticated: boolean | null;
    role: string | null;
  }

  const initialState: AdminState = {
    name: null,
    isAuthenticated: null,
    role: null,
  };

  const Adminslice = createSlice({
    name: "adminSlice",
    initialState,
    reducers: {
      setAdmin: (state, action: PayloadAction<AdminState>) => {
        return { ...state, ...action.payload };
      },
      clearAdmin: () => initialState,
    },
  });
  
  export const { setAdmin, clearAdmin } = Adminslice.actions;
  export default Adminslice.reducer;