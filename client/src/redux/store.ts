// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer'; // or wherever your reducer is
import presenceReducer from './reducers/presenceReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    presence: presenceReducer,
    // add other reducers here
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
