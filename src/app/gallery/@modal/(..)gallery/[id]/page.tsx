import { photoData, photoDataT } from '@/app/gallery/photoData'
import Modal from '@/components/Modal'
import Image from 'next/image'
import React from 'react'

type Params = { params: { id: string } }

const page = ({ params: { id } }: Params) => {
    const photo: photoDataT = photoData.find((p: photoDataT) => p.id === id)! // not a good way 

    return (
       <Modal>
            <Image
                alt={photo.name}
                src={photo.source}
                className="w-full object-cover aspect-square"
            />

            <div className="bg-white p-4">
                <h2 className="text-xl font-semibold">{photo.name}</h2>
                <h3>{photo.photographer}</h3>
                <h3>{photo.location}</h3>
            </div>
       </Modal>
    )
}

export default page