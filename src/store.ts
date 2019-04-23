import { applyMiddleware, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
// import promise from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middlewares: Middleware[] = [thunk];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapsed: true,
    duration: true,
    logErrors: true,
  });
  middlewares.push(logger);
}

function configureStore(reducer: any, initialState?: any) {
  return createStore(
    reducer, 
    initialState, 
    applyMiddleware(...middlewares)
  );
}

export default configureStore(rootReducer);
