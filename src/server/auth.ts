import { type GetServerSidePropsContext } from 'next'
import {
    getServerSession,
    type NextAuthOptions,
    type DefaultSession,
} from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/server/db'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string
        } & DefaultSession['user']
    }
    interface User {
        id: string
    }
    interface JWT {
        user: {
            id: string
        } & DefaultSession['user']
    }
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET!,
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    type: 'text',
                },
                password: { type: 'password' },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                })
                if (!user) {
                    throw new Error('Invalid Email')
                }
                const isValid = await compare(
                    credentials?.password!,
                    user.hashedPassword
                )
                if (!isValid) {
                    throw new Error('Invalid password')
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...(token.user as any),
                },
            }
        },
    },
}

export const getServerAuthSession = async (ctx?: {
    req: GetServerSidePropsContext['req']
    res: GetServerSidePropsContext['res']
}) => {
    if (ctx) {
        return await getServerSession(ctx.req, ctx.res, authOptions)
    }
    return await getServerSession(authOptions)
}
