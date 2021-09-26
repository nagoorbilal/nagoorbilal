import { createStore, combineReducers , applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../Reducer/testReducer.js";

function configureStore(initialState = {}) {
  const reducer = combineReducers({
    auth: () => ({ mock: true }),
    form: persistReducer(
      {
        key: "form", // key for localStorage key, will be: "persist:form"
        storage,
        debug: true,
        blacklist: ['Hai'],
      },
      rootReducer
    ),
  });

  const store = createStore(persistReducer({
    key: "root",
    debug: true,
    storage,
    whitelist: ['auth'],
  }, reducer), initialState , applyMiddleware(thunk));


  const persistor = persistStore(store, null, () => {
    // if you want to get restoredState
  });

  return { store, persistor };
}

export default configureStore;
