import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Simple demo authentication - replace with API call to your backend
        // Example: const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, ...)
        
        const demoEmail = process.env.ADMIN_EMAIL || 'admin@tour.com';
        const demoPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (credentials.email === demoEmail && credentials.password === demoPassword) {
          return {
            id: '1',
            email: demoEmail,
            name: 'Admin User',
            role: 'admin',
          };
        }

        // In production, call your backend API:
        // try {
        //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        //   });
        //   const data = await res.json();
        //   if (data.success && data.user) {
        //     return {
        //       id: data.user.id.toString(),
        //       email: data.user.email,
        //       name: data.user.name,
        //       role: data.user.role,
        //     };
        //   }
        // } catch (error) {
        //   console.error('Login error:', error);
        // }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
