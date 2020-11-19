import { all, call, Payload, put, takeLatest } from 'redux-saga/effects';

import { ApiResponse } from 'apisauce';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { loading } from '../global/actions';
import { Actions as ProfileActions } from '../profile/actions';
import { Actions, productSuccess } from './actions';
import { CardProduct, ProductRequest } from './types';

type ProductsPayload = Payload<ProductRequest>;

export function* getProducts({ payload }: ProductsPayload): Generator {
  const { search } = payload;

  const response = yield call(() => {
    return api.get('Categoria/Solucoes');
  });

  const { ok, data } = response as ApiResponse<CardProduct[]>;

  if (!ok) {
    toast.error('Erro ao buscar soluções, tente novamente mais tarde!');
    return;
  }

  if (!search) {
    yield put(
      productSuccess({
        data,
      }),
    );

    return;
  }

  yield put(loading(true));

  const newcards = [] as CardProduct[];

  data?.forEach(i => {
    i.solucoes?.forEach(card => {
      if (card.nome.toLowerCase().includes(search.toLowerCase())) {
        if (!newcards.length) {
          newcards.push({
            id: i.id,
            nome: i.nome,
            cor: i.cor,
            solucoes: i.solucoes,
          });
        } else {
          const index = newcards.findIndex(newCard => newCard.id === i.id);

          const cardsNew = newcards[index]?.solucoes || [];

          newcards[index] = {
            id: i.id,
            cor: i.cor,
            nome: i.nome,
            solucoes: [...cardsNew, card],
          };
        }
      }
    });
  });

  return yield put(
    productSuccess({
      data: newcards,
    }),
  );
}

export default all([
  takeLatest(Actions.PRODUCT_REQUEST, getProducts),
  takeLatest(ProfileActions.SET_PROFILE, getProducts),
]);
