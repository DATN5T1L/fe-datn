import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google, Facebook],
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
