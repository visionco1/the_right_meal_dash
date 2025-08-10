import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// saga
import rootReducer from './root-reducer'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

// Configuring redux-persist
const persistConfig = {
	key: 'root',
	storage, // uses localStorage by default
	whitelist: []
	// blacklist:[]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
// mount it on the store
const store = configureStore({
	reducer: persistedReducer,

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false // avoid redux-persist warnings
		}).concat(middleware)
})
const persistor = persistStore(store)

export { store, persistor }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
