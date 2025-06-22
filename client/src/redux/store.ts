// src/redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import presenceReducer from './reducers/presenceReducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import  notificationReducer  from './reducers/notificationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  presence: presenceReducer,
  notifications: notificationReducer,
  // Add more reducers as needed
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'presence','notifications'], // persist only these reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// For redux-persist
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
