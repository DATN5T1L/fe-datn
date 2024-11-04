import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google, Facebook],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = typeof account.access_token === 'string' ? account.access_token : undefined;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.accessToken = typeof token.accessToken === 'string' ? token.accessToken : undefined;
            return session;
        },
    },
});
