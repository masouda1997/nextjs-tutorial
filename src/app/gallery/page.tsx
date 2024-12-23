import React from 'react'
import { photoData } from './photoData'
import Link from 'next/link'
import Image from 'next/image'


const page = () => {
    return (
        <main className='flex justify-center items-center flex-col'>
            <h1>gallery page</h1>
            <div className="flex justify-between items-center gap-5 w-3/4">
                {photoData.map(photo => (
                    <Link key={photo.id} href={`gallery/${photo.id}`} className='flex flex-col justify-center items-center '>
                        <h2>{photo.name}</h2>
                        <Image src={photo.source} alt={photo.name} />
                        <div className='flex items-start  w-full flex-col '>
                            <span className='text-sm font-bold'>{photo.location}</span>
                            <span className='text-sm'>by: {photo.photographer}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}

export default page