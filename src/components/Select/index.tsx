import React from 'react';

import classNames from 'classnames';
import { Props } from 'react-select';
import Select from 'react-select';

const HubSelect: React.FC<Props> = ({ className, ...rest }) => {
  return (
    <Select
      clearable
      className={classNames(className, {
        'hub-select': true,
      })}
      classNamePrefix="hub"
      {...rest}
    />
  );
};

export default HubSelect;
