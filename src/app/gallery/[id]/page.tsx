"use client"
import React from 'react'
import { photoData, photoDataT } from '../photoData'
import Image from 'next/image'

type Params = { params: { id: string } }

function photoPage({ params: { id } }: Params) {

    const photo: photoDataT = photoData.find((p: photoDataT) => p.id === id)! // not a good way 

    return (
        <section className='flex justify-center items-center m-auto w-full h-[100vh] '>
            {photo &&
                <div className=' flex justify-between w-2/3  bg-gray-200 p-3'>
                    <div className='flex flex-col justify-between '>
                        <h1 className=''> {photo.name}</h1>
                        <span className=''>{photo.location}</span>
                        <span>{photo.location}</span>
                        <span>{photo.photographer}</span>
                    </div>
                    <Image src={photo.source} alt={photo.name} className='object-cover aspect-auto' />
                </div>
            }
        </section>
    )
}

export default photoPage