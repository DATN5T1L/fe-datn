import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

export default NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token || null;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken || null;
            return session;
        },
    },
});
