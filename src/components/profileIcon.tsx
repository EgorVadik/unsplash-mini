'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { ReactNode } from 'react'
import { signOut, useSession } from 'next-auth/react'

export default function ProfileIcon({ children }: { children: ReactNode }) {
    const { data: session } = useSession()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
            <DropdownMenuContent>
                {session != null && (
                    <>
                        <DropdownMenuLabel>
                            {session.user?.name}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                )}

                <DropdownMenuItem>
                    <Link href={'/'}>Home</Link>
                </DropdownMenuItem>
                {session != null ? (
                    <>
                        <DropdownMenuItem>
                            <button onClick={async () => await signOut()}>
                                Logout
                            </button>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem>
                            <Link href={'/auth/signin'}>Sign in</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={'/auth/signup'}>Sign up</Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
