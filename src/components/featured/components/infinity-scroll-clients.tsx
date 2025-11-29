import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import React from 'react'
import { clients } from '../lib/constants'


const InfinityScrollClients = () => {
    return (

        <div className="h-fit rounded-md mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 antialiased bg-nebula items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                items={clients}
                direction="right"
                speed="slow"

            />
            
        </div>
    )
}

export default InfinityScrollClients