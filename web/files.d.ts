declare module '*.svg' {
  import React from 'react';

  const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
