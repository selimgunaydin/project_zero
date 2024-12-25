// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { user } from "./services/user";
import counterReducer from "./services/test";


export const store = configureStore({
  reducer: {
    [user.reducerPath]: user.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(user.middleware),
});

// store tipi (opsiyonel)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
