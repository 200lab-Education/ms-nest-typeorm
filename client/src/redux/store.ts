import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/order.slice';

export const store = configureStore({
  reducer: {
    orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
