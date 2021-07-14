import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  console.log(req.body);
  console.log('sad');
  return res.send('hi');
};

export default handler;
