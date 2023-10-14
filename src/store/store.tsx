import { configureStore } from '@reduxjs/toolkit';
import mainSliceReducer from '../slice/slice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    mainSlice: mainSliceReducer,
  },
  // middleware: (defaultMiddleware) => defaultMiddleware().concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;
