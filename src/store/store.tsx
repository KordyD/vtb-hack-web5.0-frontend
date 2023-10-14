import { configureStore } from "@reduxjs/toolkit";
import mainSliceReducer from "../slice/slice";

export const store = configureStore({
  reducer: {
    mainSlice: mainSliceReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;