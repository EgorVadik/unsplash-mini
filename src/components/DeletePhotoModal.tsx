'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios, { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const DeletePhotoSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type DeletePhoto = z.infer<typeof DeletePhotoSchema>

export default function DeletePhotoModal({
    id,
    children,
}: {
    id: string
    children: React.ReactNode
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DeletePhoto>({
        resolver: zodResolver(DeletePhotoSchema),
    })
    const { toast } = useToast()
    const router = useRouter()
    const dialogRef = useRef<HTMLDivElement>(null)

    const onSubmit = async (data: DeletePhoto) => {
        try {
            const res = await axios.delete(`/api/photos`, {
                data: {
                    id,
                    password: data.password,
                },
            })
            if (res.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Photo deleted',
                })

                dialogRef.current?.click()
                router.refresh()
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    toast({
                        title: 'Unauthorized',
                        description: 'Incorrect password',
                    })
                } else {
                    toast({
                        title: 'Error',
                        description: 'Something went wrong',
                    })
                }
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent ref={dialogRef}>
                <DialogHeader>
                    <DialogTitle className='text-2xl font-normal text-[#333333]'>
                        Are you sure?
                    </DialogTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogDescription>
                            <div className='flex flex-col my-5 gap-2'>
                                <label
                                    htmlFor='password'
                                    className='text-gray-border-dark'
                                >
                                    Password
                                </label>
                                <input
                                    id='password'
                                    type='password'
                                    {...register('password')}
                                    placeholder='********'
                                    className={`border rounded-xl p-3 border-gray-border-dark shadow-search-bar outline-none ${
                                        errors.password?.message &&
                                        'border-red-500'
                                    }`}
                                />
                                <p className='text-red-500'>
                                    {errors.password?.message}
                                </p>
                            </div>
                        </DialogDescription>
                        <DialogFooter className='flex gap-3'>
                            <DialogClose>
                                <button
                                    type='button'
                                    className='text-gray-border'
                                >
                                    Cancel
                                </button>
                            </DialogClose>
                            <button
                                type='submit'
                                className='text-white bg-red-delete rounded-xl px-5 py-3 font-bold'
                            >
                                Delete
                            </button>
                        </DialogFooter>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
