import Image from 'next/image'
import React from 'react'
import FeatureGrid from './feature-grid'
import { megalosFeatures } from '../lib/constants'

const MegalosSection = () => {

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="flex flex-col gap-8">
                <div className="grid  gap-4 w-full">
                    <div className="flex flex-col gap-4">
                        <h1 className='text-2xl lg:text-5xl max-w-5xl font-medium text-white dark:text-white  md:leading-snug'>
                            Megalos
                        </h1>
                        <p className='text-sm text-muted-foreground max-w-2xl text-justify'>Terdepan dengan Teknologi Canggih dalam Pengelolaan Bandwidth, Sistem Manajemen Pengguna, Analitik Terpadu, dan dapat diintegrasikan dengan Sistem Internal Perusahaan Anda. Dengan rancangan detail, Megalos menghadirkan fitur unggulan yang mengoptimalkan pengelolaan user dan bandwidth Anda.
                        </p>
                    </div>
                    <Image
                        src="/assets/product/banner-megalos.png"
                        alt={"client"}
                        width={400}
                        height={300}
                        className="w-full h-auto object-contain rounded-xl transition-all duration-200 group-hover:blur-sm"
                        priority
                    />
                </div>
                <FeatureGrid
                    features={megalosFeatures}
                />
            </div>
        </div>
    )
}

export default MegalosSection