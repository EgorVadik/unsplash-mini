'use client'
import { photosAtom } from '@/atoms/atoms'
import { useDebouncedState } from '@mantine/hooks'
import axios, { AxiosError } from 'axios'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'

export default function SearchBar() {
    const [value, setValue] = useDebouncedState('', 400)
    const [, setPhotos] = useAtom(photosAtom)
    const { toast } = useToast()

    useEffect(() => {
        const getPhotos = async () => {
            try {
                const res = await axios.get('/api/photos', {
                    params: {
                        query: value,
                    },
                })
                setPhotos(res.data.photos)
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 404) {
                        toast({
                            title: 'No photos found for ' + value,
                        })
                    }
                }
            }
        }
        getPhotos()
    }, [value, setPhotos, toast])

    return (
        <input
            type='text'
            placeholder='Search by name'
            className='border rounded-xl p-3 sm:min-w-[300px] border-gray-border shadow-search-bar outline-none'
            onChange={(e) => setValue(e.currentTarget.value)}
        />
    )
}
