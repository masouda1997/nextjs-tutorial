import { StaticImageData } from 'next/image';
import p1 from "./-photos/p1.jpg"
import p2 from "./-photos/p2.jpg"
import p3 from "./-photos/p3.jpg"


export type photoDataT = {
    id:string,
    name:string,
    source:StaticImageData | string,
    photographer: string,
    location: string
}

export const photoData : photoDataT[] = [
    {
        id: "1",
        name: "Sunset at Beach",
        source: p1,
        photographer: "John Doe",
        location: "Malibu, California, USA"
    },
    {
        id: "2",
        name: "Mountain Adventure",
        source: p2,
        photographer: "Jane Smith",
        location: "Swiss Alps, Switzerland"
    },
    {
        id: "3",
        name: "City Lights at Night",
        source: p3,
        photographer: "Alice Johnson",
        location: "New York City, New York, USA"
    }
]
