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
import { Photo, PhotoSchema } from '@/validations/addPhotoValidation'
import { useSession } from 'next-auth/react'
import axios from 'axios'

export default function AddPhotoModal({
    children,
}: {
    children: React.ReactNode
}) {
    const session = useSession()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Photo>({
        resolver: zodResolver(PhotoSchema),
    })

    const onSubmit = async (data: Photo) => {
        const err = await axios.post('/api/photos', data)
    }

    return (
        <Dialog>
            <DialogTrigger
                className='disabled:cursor-not-allowed'
                disabled={session == null}
            >
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-2xl font-normal text-[#333333]'>
                        Add a new photo
                    </DialogTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogDescription>
                            <div className='flex flex-col my-5 gap-2'>
                                <label
                                    htmlFor='label'
                                    className='text-gray-border-dark'
                                >
                                    Label
                                </label>
                                <input
                                    id='label'
                                    className={`border rounded-xl p-3 border-gray-border-dark shadow-search-bar outline-none ${
                                        errors.label?.message &&
                                        'border-red-500'
                                    }`}
                                    placeholder='Lorem ipsum'
                                    {...register('label')}
                                />
                                <p className='text-red-500'>
                                    {errors.label?.message}
                                </p>

                                <label
                                    htmlFor='photoUrl'
                                    className='text-gray-border-dark'
                                >
                                    Photo URL
                                </label>
                                <input
                                    id='photoUrl'
                                    {...register('url')}
                                    placeholder='https://picsum.photos/200/300'
                                    className={`border rounded-xl p-3 border-gray-border-dark shadow-search-bar outline-none ${
                                        errors.url?.message && 'border-red-500'
                                    }`}
                                />
                                <p className='text-red-500'>
                                    {errors.url?.message}
                                </p>
                            </div>
                        </DialogDescription>
                        <DialogFooter className='flex gap-3'>
                            <DialogClose>
                                <div className='text-gray-border'>Cancel</div>
                            </DialogClose>
                            <button
                                type='submit'
                                className='text-white bg-green rounded-xl px-5 py-3 font-bold'
                            >
                                Submit
                            </button>
                        </DialogFooter>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
