import React from "react";
import ReactDOM from "react-dom";
import "./sass/index.scss";
import App from "./components/App";

import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import rootReducer from "./reducers";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const initialState = {};
const middlewares = [reduxThunk, promiseMiddleware];

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(
  persistedReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
