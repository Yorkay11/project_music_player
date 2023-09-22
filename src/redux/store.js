import { configureStore } from '@reduxjs/toolkit';

import { back4AppApi } from './services/shazamCore';
import playerReducer from './features/playerSlice';

export const store = configureStore({
  reducer: {
    [back4AppApi.reducerPath]: back4AppApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(back4AppApi.middleware),
});
