import User from '@models/User';
import { connectDb } from '@utils/withMongoose';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentails',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: { email: string; password: string }) {
        await connectDb();
        const user = await User.findOne({ email: credentials.email });

        return user ? user.data : null;
      },
    }),
  ],
  secret: process.env.SECRET,
});
