import { ExamplesReducer } from './modules/example/types';

interface ApplicationState {
  example: ExamplesReducer;
}
declare global {
  declare namespace Store {
    type State = ApplicationState;
  }
}
