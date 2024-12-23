import Link from 'next/link'
import React from 'react'


const page = () => {
  return (
    <div>
      <Link className='text-pink-950 bg-red-400 p-2 contrast-more:' href="/gallery">go to gallery </Link>
    </div>
  )
}

export default page