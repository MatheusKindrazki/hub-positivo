import { AES } from 'crypto-js';

import { store } from '~/store';

const key = process.env.REACT_APP_ENCRYPT_TOKEN || 'psd-hub';

export const getEncryptToken = (): string => {
  const token = store.getState().auth.token || '';

  const aesCrypto = AES.encrypt(token, key).toString();

  return aesCrypto;
};
