import Image from 'next/image'
import DeletePhotoModal from './DeletePhotoModal'

type props = {
    id: string
    label: string
    url: string
    isOwner?: boolean
}

export default function PhotoCard({ id, label, url, isOwner }: props) {
    return (
        <div className='flex flex-col items-center justify-center relative group rounded-3xl w-fit m-auto'>
            <Image
                className='rounded-3xl'
                src={url}
                alt={label}
                width={400}
                height={400}
            />
            <div className='rounded-3xl bg-black/40 absolute inset-0 group-hover:opacity-100 opacity-0 duration-300'>
                <div className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col items-end p-6'>
                        {isOwner && (
                            <DeletePhotoModal id={id}>
                                <div className='text-red-delete border border-red-delete px-3 py-1 rounded-3xl text-xs'>
                                    delete
                                </div>
                            </DeletePhotoModal>
                        )}
                    </div>
                    <div className='flex flex-col justify-end h-full'>
                        <h3 className='text-xl font-bold text-white p-6 select-none'>
                            {label}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
