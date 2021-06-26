import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (_, res) => {
  // Exit user from Preview Mode
  res.clearPreviewData();

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: '/' });

  res.end();
};

export default handler;
