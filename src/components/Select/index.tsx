import React from 'react';

import classNames from 'classnames';
import { Props } from 'react-select';
import Select from 'react-select';

const HubSelect: React.FC<Props> = ({ ...rest }) => {
  return (
    <Select
      clearable
      className={classNames({
        'hub-select': true,
      })}
      classNamePrefix="hub"
      options={[
        {
          label: 'ola',
          value: 'teste',
        },
        {
          label: 'ola',
          value: 'teste',
        },
      ]}
      {...rest}
    />
  );
};

export default HubSelect;
