import {
  createStore,
  compose,
  applyMiddleware,
  Reducer,
  StoreCreator,
  Middleware,
  Dispatch,
  AnyAction,
  Func0,
} from 'redux';

type Mid = Middleware<Dispatch<AnyAction>>[];

export default (reducers: Reducer, middlewares: Mid): StoreCreator => {
  const enhancerCompose = console.tron.createEnhancer() as Func0<unknown>;

  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(enhancerCompose, applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);
  return createStore(reducers, enhancer);
};
