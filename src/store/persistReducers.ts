import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import createEncryption from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';

const encrypted = createEncryption({
  secretKey: process.env.REACT_APP_SECRET_ENCRYPTED_KEY || 'PSD',
});

export default (reducers: Reducer): Reducer => {
  const persistName = process.env.REACT_APP_PERSIST_NAME || 'example';

  const persistedReducer = persistReducer(
    {
      key: persistName,
      storage,
      whitelist: ['auth'],
      transforms: [encrypted as any],
    },
    reducers,
  );

  return persistedReducer;
};
