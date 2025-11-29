"use client"
import React from 'react'
import FeatureGrid from './feature-grid'
import { vlepoFeatures } from '../lib/constants'
import dynamic from 'next/dynamic'
import "vimond-replay/index.css"
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Replay = dynamic(
  () => import("vimond-replay").then((mod) => mod.Replay),
  { ssr: false },
)

const VlepoSection = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="flex flex-col gap-8">
        <div className="grid gap-4 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col gap-4">
              <h1 className='text-2xl lg:text-5xl max-w-5xl font-medium text-white dark:text-white  md:leading-snug'>
                Vlepo
              </h1>
              <p className='text-sm text-muted-foreground max-w-2xl text-justify'>Inovasi hiburan digital terdepan yang berfokus pada personalisasi konten dan interaktivitas TV serta akses ke siaran streaming premium yang semuanya dikelola dalam satu dashboard canggih untuk menyajikan pengalaman tamu yang tak terlupakan.
              </p>
            </div>
            <Link href="https://vlepo.id/" target='_blank'>
              <Button className='nebula-bg rounded-xl px-3 py-2 text-sm flex items-center gap-2 border border-blue-400/30 bg-blue-500/10 font-medium  text-blue-100 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/40 '>
                Kunjungi Vlepo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <Replay source="https://storage.googleapis.com/assets-varnion/Vlepo%20-%20Features.mp4" />
        </div>
        <FeatureGrid
          features={vlepoFeatures}
        />
      </div>
    </div>
  )
}

export default VlepoSection