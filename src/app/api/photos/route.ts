import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { compare } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')

    const photos = await prisma.photo.findMany({
        where: {
            label: {
                contains: query ?? '',
                mode: 'insensitive',
            },
        },
    })

    if (photos.length === 0) {
        return new Response(null, {
            status: 404,
        })
    }

    return new Response(
        JSON.stringify({
            photos,
        }),
        { status: 200 }
    )
}

export async function POST(req: Request) {
    const { label, url } = (await req.json()) as { label: string; url: string }
    const session = await getServerAuthSession()
    if (!session) {
        return new NextResponse(null, { status: 401 })
    }

    try {
        await prisma.photo.create({
            data: {
                label,
                url,
                userId: session.user.id,
            },
        })
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ err: error.message }), {
            status: 500,
        })
    }

    return new NextResponse(null, { status: 201 })
}

export async function DELETE(req: Request) {
    const { id, password } = (await req.json()) as {
        id: string
        password: string
    }
    const session = await getServerAuthSession()
    if (!session) {
        return new NextResponse(null, { status: 401 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
        })
        if (!user) {
            return new NextResponse(null, { status: 401 })
        }

        const isValid = await compare(password, user.hashedPassword)
        if (!isValid) {
            return new NextResponse(null, { status: 401 })
        }
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ err: error.message }), {
            status: 500,
        })
    }

    try {
        await prisma.photo.delete({
            where: {
                id,
                userId: session.user.id,
            },
        })
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ err: error.message }), {
            status: 500,
        })
    }

    return new NextResponse(null, { status: 200 })
}
