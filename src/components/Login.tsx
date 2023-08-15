'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginType = z.infer<typeof LoginSchema>

export default function Login() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginType>({
        resolver: zodResolver(LoginSchema),
    })

    const onSubmit = async (data: LoginType) => {
        setLoading(true)
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
            callbackUrl: '/',
        })

        if (res?.error?.includes('reach database')) {
            toast({
                title: 'Error',
                description: 'Internal server error, please try again later',
            })
        }

        if (res?.error?.includes('Invalid Email')) {
            toast({
                title: 'Invalid Email',
            })
        }

        if (res?.error?.includes('Invalid password')) {
            toast({
                title: 'Invalid Password',
            })
        }
        setLoading(false)

        if (!res?.error) {
            return router.replace('/')
        }
    }

    return (
        <main className='flex flex-col items-center'>
            <h1 className='text-3xl font-medium mt-20'>Login</h1>
            <p className='border-gray-border-dark mt-2'>Welcome back.</p>
            <form
                className='flex flex-col mt-8 max-w-lg w-screen px-4 gap-4'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='flex flex-col gap-2'>
                    <label htmlFor='email'>Email</label>
                    <input
                        className={`border rounded-md p-2 outline-none ${
                            errors.email?.message
                                ? 'border-red-500'
                                : 'border-gray-border-dark'
                        }`}
                        type='email'
                        id='email'
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className='text-red-500'>{errors.email.message}</p>
                    )}
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor='password'>Password</label>
                    <input
                        className={`border rounded-md p-2 outline-none ${
                            errors.password?.message
                                ? 'border-red-500'
                                : 'border-gray-border-dark'
                        }`}
                        type='password'
                        id='password'
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className='text-red-500'>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    className='bg-black text-white rounded-md p-3 mt-4'
                    type='submit'
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>

                <div className='border border-gray-300 py-10 mt-5'>
                    <p className='text-center'>
                        {"Don't have an account? "}
                        <Link
                            href='/auth/signup'
                            className='text-gray-400 underline'
                        >
                            Join Unsplash Mini
                        </Link>
                    </p>
                </div>
            </form>
        </main>
    )
}
