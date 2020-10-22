import {
  createStore,
  compose,
  applyMiddleware,
  Reducer,
  StoreCreator,
} from 'redux';

export default (reducers: Reducer, middlewares: any): StoreCreator => {
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);
  return createStore(reducers, enhancer);
};
