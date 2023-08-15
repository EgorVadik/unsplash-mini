import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import NextAuthProvider from '@/providers/NextAuthProvider'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
    title: 'Unsplash Mini',
    description:
        'A mini version of Unsplash built with Next.js and TailwindCSS by @alitamer',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body className={'md:px-20 px-5'}>
                <NextAuthProvider>
                    <Navbar />
                    {children}
                    <Toaster />
                </NextAuthProvider>
            </body>
        </html>
    )
}
