import { User } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    const { pathname } = req.nextUrl
    const user = token?.user as User | undefined

    if (
        (pathname.includes('/auth/signin') ||
            pathname.includes('/auth/signup')) &&
        user
    ) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = { matcher: ['/auth/:path*', '/api/auth/:path*'] }
