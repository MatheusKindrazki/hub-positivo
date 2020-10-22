import { Store } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { routerMiddleware } from 'connected-react-router';

import history from '~/services/history';

import createStore from './createStore';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import persistReducers from './persistReducers';
import { ApplicationState } from './store';

import '~/config/reactotronConfig';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron?.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware, routerMiddleware(history)];

const store: Store<ApplicationState> = (createStore(
  persistReducers(rootReducer),
  middlewares,
) as unknown) as Store<ApplicationState>;

const persistor = persistStore((store as unknown) as Store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
