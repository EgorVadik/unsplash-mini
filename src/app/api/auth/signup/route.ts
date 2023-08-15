import { prisma } from '@/server/db'
import { hash } from 'bcrypt'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(req: Request) {
    const { name, email, password } = await req.json()

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword: await hash(password, 10),
            },
        })

        return NextResponse.json({ newUser }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
