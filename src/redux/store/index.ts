import { configureStore } from '@reduxjs/toolkit'
import authReducer from "@/redux/slices/authSlice"
import cartReducer from '../slices/cartSlice'
import storage from "redux-persist/lib/storage"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import { baseApi } from '../apis/baseApi'

const authPersistConfig = {
  key: "auth",
  storage,
}

const cartPersistConfig = {
  key: "cart",
  storage,
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer)

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch