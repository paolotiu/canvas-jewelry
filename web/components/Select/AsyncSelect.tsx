import React from 'react';
import ReactAsyncSelect from 'react-select/async';
import { customStyles, getTheme } from './customStyles';

const AsyncSelect = React.forwardRef<any, any>(
  ({ ...props }: React.ComponentProps<typeof ReactAsyncSelect>, ref) => {
    return (
      <ReactAsyncSelect
        styles={customStyles as any}
        defaultOptions
        cacheOptions
        theme={getTheme}
        ref={ref}
        {...props}
      />
    );
  },
);

export default AsyncSelect;
