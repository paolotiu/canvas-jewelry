import * as yup from 'yup';

export const ItemSchema = yup.object().shape({
  name: yup.string().required().max(70),
  price: yup.number().typeError('price must be a number').required(),
  description: yup.string(),
});
