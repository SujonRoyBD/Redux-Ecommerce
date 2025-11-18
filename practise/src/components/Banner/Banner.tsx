import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const data = [
    { id:1, name:"sujon", roll:"11", img:"/assets/ourUnique.jpg.png", prise:"200" },
    { id:2, name:"sujon", roll:"11", img:"/assets/ourUnique.jpg.png", prise:"200" },
    { id:3, name:"sujon", roll:"11", img:"/assets/ourUnique.jpg.png", prise:"200" },
    { id:4, name:"sujon", roll:"11", img:"/assets/ourUnique.jpg.png", prise:"200" },
]

export default function BannerPage() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4'>
      {data.map((item)=>(
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.roll}</p>
          <p>{item.prise}</p>

          <Link href={`/user/${item.id}`}>
            <Image src={item.img} alt={item.name} width={200} height={200} />
          </Link>
        </div>
      ))}
    </div>
  )
}
