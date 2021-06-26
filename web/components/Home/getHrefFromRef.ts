export const getHrefFromRef = ({ _type, slug }: { _type: string; slug: string }) => {
  if (_type === 'product') {
    return `item/${slug}`;
  }
  return `${_type}/${slug}`;
};
