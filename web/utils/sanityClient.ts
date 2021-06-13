import client from '@sanity/client';

export const sanityClient = client({
  projectId: '94xotc05',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-06-13',
});
