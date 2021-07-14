import Paymongo from '@paymongo/core';

export const serverPaymongo = new Paymongo(process.env.PAYMONGO_SECRET_KEY as any);
