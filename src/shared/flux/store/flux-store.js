import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import asyncMiddleware from 'flux/middlewares/async';
import logger from 'flux/middlewares/logger';
import { reducers, INITIAL_STATE } from 'flux';

const middlewares = [asyncMiddleware];
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

export function createStore(initialState) {
  return reduxCreateStore(reducers, initialState || INITIAL_STATE, applyMiddleware(...middlewares));
}
