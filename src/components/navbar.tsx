import Image from 'next/image'
import React from 'react'
import ProfileIcon from './profileIcon'
import AddPhotoModal from './AddPhotoModal'
import SearchBar from './SearchBar'

export default function Navbar() {
    return (
        <nav className='flex items-center justify-between py-5'>
            <div className='flex items-center gap-4'>
                <ProfileIcon>
                    <Image
                        src={'/person.svg'}
                        alt='Profile Picture'
                        height={40}
                        width={40}
                    />
                </ProfileIcon>
                <div>
                    <SearchBar />
                </div>
            </div>
            <AddPhotoModal>
                <div className='bg-green rounded-xl p-3 text-white font-bold filter drop-shadow-add-btn'>
                    Add a photo
                </div>
            </AddPhotoModal>
        </nav>
    )
}
