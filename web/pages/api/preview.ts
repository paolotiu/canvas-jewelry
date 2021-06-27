import { NextApiHandler } from 'next';

// eslint-disable-next-line consistent-return
const handler: NextApiHandler = async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  //   if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET || !req.query.slug) {
  //     return res.status(401).json({ message: 'Invalid token' });
  //   }

  const { secret, slug, type } = req.query;

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!slug || !type) {
    return res.status(401).json({ message: 'No slug or type given' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  if (type === 'product') {
    res.writeHead(307, { Location: `/item/${slug}` });
  } else {
    res.writeHead(307, { Location: `/${type}/${slug}` });
  }

  res.end();
};

export default handler;
