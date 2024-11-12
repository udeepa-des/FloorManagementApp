import { configureStore } from '@reduxjs/toolkit';
import floorManagementReducer from './floorManagementSlice';

export const store = configureStore({
  reducer: {
    floorManagement: floorManagementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;