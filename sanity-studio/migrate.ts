import client from 'part:@sanity/base/client';

const fetchDocuments = () =>
  client.fetch(`
*[_type == 'category' && lower(name) == lower("test")] {
	name,
	'products': *[_type == 'product' && references(^._id)]{
	images[],
'lqid': images[0].asset->
	}
}
`);

(async () => {
  const x = await fetchDocuments();
  console.log(x);
})();
