import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import immutableTransform from "redux-persist-transform-immutable";

import all from "./Store/index";

// Import sagas
const { authentication } = all;

const rootReducer = combineReducers({
  authentication: authentication.reducer
});

const persistConfig = {
  transforms: [immutableTransform()],
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleWare = createSagaMiddleware();

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare))
);
export const persistor = persistStore(store);

[authentication].forEach(middle => middle.sagas.map(sagaMiddleWare.run));
