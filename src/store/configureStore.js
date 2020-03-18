import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

import { createLogger } from 'redux-logger'
import DevTools from '../containers/DevTools';

function configureStore(initialState) {

  const logger = createLogger()

  const middlewares = [
    reduxImmutableStateInvariant(),
    thunk,
    logger
  ];

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      DevTools.instrument()
    )
  );

  return store;
}

export default configureStore;
