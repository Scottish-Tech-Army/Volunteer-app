import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, Middleware } from 'redux'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { api } from '@/Services/api'
import * as modules from '@/Services/modules'
import events from './Events'
import theme from './Theme'

const reducers = combineReducers({
  events,
  theme,
  ...Object.values(modules).reduce(
    (acc, module) => ({
      ...acc,
      [module.reducerPath]: module.reducer,
    }),
    {},
  ),
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['events', 'theme'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware as Middleware)

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }

    return middlewares
  },
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }
