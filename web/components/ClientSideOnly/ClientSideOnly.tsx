import React from 'react';
import { useIsSSR } from '../../utils/hooks/useIsSSR';

interface Props {
  children: React.ReactNode;
  loader?: React.ReactNode;
}
const ClientSideOnly = ({ children, loader }: Props) => {
  const isSSR = useIsSSR();
  if (isSSR) return loader ? <>{loader} </> : null;
  return <>{children}</>;
};

export default ClientSideOnly;
