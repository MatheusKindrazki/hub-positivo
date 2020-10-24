import { Store } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware, { SagaMonitor } from 'redux-saga';

import { routerMiddleware } from 'connected-react-router';

import history from '~/services/history';

import createStore from './createStore';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import persistReducers from './persistReducers';
import { ApplicationState } from './store';

import '~/config/reactotronConfig';

const sagaMonitor =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

const monitor = (sagaMonitor as unknown) as SagaMonitor;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor: monitor });

const middlewares = [routerMiddleware(history), sagaMiddleware];

const store: Store<ApplicationState> = (createStore(
  persistReducers(rootReducer),
  middlewares,
) as unknown) as Store<ApplicationState>;

const persistor = persistStore((store as unknown) as Store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
