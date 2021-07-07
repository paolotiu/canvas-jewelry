import React from 'react';
import ReactAsyncSelect from 'react-select/async';
import { customStyles, getTheme } from './customStyles';

const AsyncSelect = ({ ...props }: React.ComponentProps<typeof ReactAsyncSelect>) => {
  return (
    <ReactAsyncSelect
      styles={customStyles as any}
      defaultOptions
      cacheOptions
      theme={getTheme}
      {...props}
    />
  );
};

export default AsyncSelect;
