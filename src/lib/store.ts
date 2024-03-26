  import { configureStore, combineReducers } from "@reduxjs/toolkit";
  import questionsReducer from "./features/questions/questionsSlice";
  import storage from "redux-persist/lib/storage";
  import { persistReducer, persistStore } from "redux-persist";
  import uiReducer from "./features/ui/uiSlice";

  const persistConfig = {
    key: "root",
    storage,
  };

  const rootReducer = combineReducers({
    questions: questionsReducer,
    ui: uiReducer,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  export const persistor = persistStore(store);

  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>;
  // Inferred type: {questions: QuestionsState}
  export type AppDispatch = typeof store.dispatch;
