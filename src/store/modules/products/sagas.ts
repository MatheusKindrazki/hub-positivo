import { all, Payload, put, takeLatest } from 'redux-saga/effects';

import { loading } from '../global/actions';
import { Actions, productSuccess } from './actions';
import cardMock from './mock';
import { CardProduct, ProductRequest } from './types';

type ProductsPayload = Payload<ProductRequest>;

export function* getProducts({ payload }: ProductsPayload): Generator {
  const { search } = payload;

  if (!search) {
    yield put(
      productSuccess({
        data: cardMock,
      }),
    );

    return;
  }

  yield put(loading(true));

  const newcards = [] as CardProduct[];

  cardMock.forEach(i => {
    i.cards.forEach(card => {
      if (card.title.toLowerCase().includes(search.toLowerCase())) {
        if (!newcards.length) {
          newcards.push({
            id: i.id,
            title: i.title,
            cards: [card],
          });
        } else {
          const index = newcards.findIndex(newCard => newCard.id === i.id);

          const cardsNew = newcards[index]?.cards || [];

          newcards[index] = {
            id: i.id,
            title: i.title,
            cards: [...cardsNew, card],
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

export default all([takeLatest(Actions.PRODUCT_REQUEST, getProducts)]);
