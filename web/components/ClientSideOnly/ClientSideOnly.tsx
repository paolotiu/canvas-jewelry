import React from 'react';
import { useIsSSR } from '../../utils/hooks/useIsSSR';

interface Props {
  children: React.ReactNode;
}
const ClientSideOnly = ({ children }: Props) => {
  const isSSR = useIsSSR();
  if (isSSR) return null;
  return <>{children}</>;
};

export default ClientSideOnly;
