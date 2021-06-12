import { useSession } from 'next-auth/client';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Protected = ({ children }: Props) => {
  const [session, loading] = useSession();

  if (loading) return null;
  if (!session) return <p>NOT ALLOWED</p>;
  return <>{children}</>;
};

export default Protected;
