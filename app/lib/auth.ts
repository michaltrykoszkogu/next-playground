import CredentialsProvider from "next-auth/providers/credentials";
import {NextAuthOptions} from "next-auth";
import {JWT_SECRET} from "../consts/jwt";
import {decode, encode} from "./jwt";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                const {email, password} = credentials as { email: string, password: string };

                // here's where you would validate the credentials
                const user = {id: 1, name: "test", email};

                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    debug: true,
    secret: JWT_SECRET,
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.user = user;
            }

            return token;
        },
        async session({session, token, user}) {
            return session;
        }
    },
    jwt: {
        encode: async ({token}) => {
            return encode({token});
        },
        decode: async ({token}) => {
            return decode({token});
        }
    }
};
