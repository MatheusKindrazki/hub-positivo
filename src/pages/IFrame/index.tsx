import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@chakra-ui/core';

import history from '~/services/history';
import { loading } from '~/store/modules/global/actions';
import documentTitle from '~/utils/documentTitle';

const Iframe: React.FC = () => {
  documentTitle('Studos');

  const dispatch = useDispatch();

  const { frameUrl } = useSelector((state: Store.State) => state.products);

  useEffect(() => {
    if (!frameUrl) {
      return history.push('/');
    }

    dispatch(loading(true));

    setTimeout(() => {
      dispatch(loading(false));
    }, 3000);
  }, [dispatch, frameUrl]);

  if (!frameUrl) return null;

  return (
    <Box backgroundColor="white">
      <iframe
        src={frameUrl}
        title="application"
        style={{
          width: '100%',
          height: '92.5vh',
        }}
      />
    </Box>
  );
};

export default Iframe;
