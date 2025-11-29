import React from 'react'
import { testimonials } from '../lib/constants'
import Image from 'next/image'

const ClientsGridGallery = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                    <h1 className='text-2xl lg:text-5xl max-w-5xl mx-auto text-center font-medium text-white dark:text-white  md:leading-snug'>Our Clients</h1>
                    <p className='text-sm lg:text-base  max-w-2xl mx-auto text-muted-foreground text-center font-normal '>We have supported over 400+ businesses and loyal Varnion customers.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center"
                >
                    {testimonials.map((item) => (
                        <Image
                            key={item.id}
                            src={item.src}
                            alt={"client"}
                            width={400}
                            height={300}
                            className="w-full h-52 object-contain bg-white rounded-none transition-all duration-200 group-hover:blur-sm"
                            priority
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ClientsGridGallery