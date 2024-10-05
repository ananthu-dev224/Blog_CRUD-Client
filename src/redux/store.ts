import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import persistConfig from "../config/persist";

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer:persistedReducer
})





export const persistor = persistStore(store);