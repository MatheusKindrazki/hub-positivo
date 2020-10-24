import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

interface Tron {
  createEnhancer: () => unknown;
  clear: () => void;
  log: (d: unknown) => void;
}
declare global {
  interface Console {
    tron: Tron;
  }
}

if (process.env.NODE_ENV === 'development') {
  const tron = (Reactotron.configure()
    .use(reactotronSaga({}))
    .use(reactotronRedux())
    .connect() as unknown) as Tron;

  tron.clear();

  console.tron = tron;
}
