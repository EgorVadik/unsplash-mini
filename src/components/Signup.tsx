'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios, { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const SignupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type SignupType = z.infer<typeof SignupSchema>

export default function Signup() {
    const router = useRouter()
    const { toast } = useToast()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupType>({
        resolver: zodResolver(SignupSchema),
    })

    const onSubmit = async (data: SignupType) => {
        try {
            const res = await axios.post('/api/auth/signup', data)
            if (res.status === 201) {
                toast({
                    title: 'Account created',
                    description: 'Please login to continue',
                })
                router.push('/auth/signin')
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const err = error.response?.data.error
                if (err.includes('Unique constraint')) {
                    toast({
                        title: 'Email already exists',
                        description: 'Please try again with a different email',
                    })
                }
            }
        }
    }

    return (
        <main className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold mt-20'>Join Unsplash Mini</h1>
            <p className='border-gray-border-dark mt-2'>
                Already have an account?{' '}
                <Link href={'/auth/signin'} className='text-gray-400 underline'>
                    Login
                </Link>
            </p>
            <form
                className='flex flex-col mt-8 max-w-lg w-screen px-4 gap-4'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='flex flex-col gap-2'>
                    <label htmlFor='name'>Name</label>
                    <input
                        className={`border rounded-md p-2 outline-none ${
                            errors.name?.message
                                ? 'border-red-500'
                                : 'border-gray-border-dark'
                        }`}
                        type='text'
                        id='name'
                        {...register('name')}
                    />
                    {errors.name && (
                        <p className='text-red-500'>{errors.name.message}</p>
                    )}
                </div>

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
                >
                    Join
                </button>
            </form>
        </main>
    )
}
