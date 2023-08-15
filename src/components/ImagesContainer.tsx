'use client'
import type { Photo } from '@prisma/client'
import { Session } from 'next-auth'
import PhotoCard from './PhotoCard'
import { useAtom } from 'jotai'
import { photosAtom } from '@/atoms/atoms'
import { useEffect } from 'react'

type Props = {
    images: Photo[]
    session: Session | null
}

export default function ImagesContainer({ images, session }: Props) {
    const [photos, setPhotos] = useAtom(photosAtom)

    useEffect(() => {
        setPhotos(images)
    }, [images, setPhotos])

    return (
        <main className='xl:columns-4 lg:columns-3 md:columns-2 columns-1 space-y-5 my-10'>
            {photos.map((photo) => (
                <PhotoCard
                    key={photo.id}
                    {...photo}
                    isOwner={photo.userId === session?.user.id}
                />
            ))}
        </main>
    )
}
