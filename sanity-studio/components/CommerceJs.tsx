import React, { useEffect } from 'react';
import Commerce from '@chec/commerce.js';

const commerce = new Commerce(
  'pk_2982681b2d503b999b1e73784fa635e8fd2c7e1bde13f'
);
interface Props {}

const CommerceJs = (props: Props) => {
  useEffect(() => {
    commerce.products.getVariants('prod_RqEv5xXkq05Zz4').then(console.log);
  }, []);
  return <div></div>;
};

export default CommerceJs;
