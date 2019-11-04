import { applyMiddleware, createStore, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { createBlacklistFilter } from 'redux-persist-transform-filter';

import rootReducer from './reducers';
import apiMiddleware from './middleware';
import { logMessage } from './src/common/utils/logging';

let rehydrationComplete;
let rehydrationFailed;

const rehydrationPromise = new Promise((resolve, reject) => {
  rehydrationComplete = resolve;
  rehydrationFailed = reject;
});

export function rehydration() {
  logMessage('Calling Rehydration...');
  return rehydrationPromise;
}

const createCustomStore = () => {
  const blacklistLoginFilter = createBlacklistFilter('auth', [
    'loginInProgress',
    'error',
    'authInProgress',
    'requestingToken'
  ]);

  const persistConfig = {
    key: 'phone-webapp',
    storage,
    blacklist: ['connection', 'search', 'call', 'dialpad', 'settings'],
    transforms: [blacklistLoginFilter],
    stateReconciler: autoMergeLevel2
  };

  const persistedReducers = persistReducer(persistConfig, rootReducer);

  return createStore(
    persistedReducers,
    {},
    compose(
      applyMiddleware(apiMiddleware),
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
};

const configureStore = () => {
  const store = createCustomStore();
  const persistor = persistStore(store, null, () => {
    // this will be invoked after rehydration is complete
    rehydrationComplete();
  });

  return { store, persistor };
};

/**
 * Set up the store and the history
 */
export const { store, persistor } = configureStore();
