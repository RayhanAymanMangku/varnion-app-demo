"use client"
import React from 'react'
import FeatureGrid from './feature-grid'
import { vlepoFeatures } from '../lib/constants'
import dynamic from 'next/dynamic'
import "vimond-replay/index.css"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Replay = dynamic(
  () => import("vimond-replay").then((mod) => mod.Replay),
  { ssr: false },
)

const KeponetSection = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="flex flex-col gap-8">
        <div className="grid  gap-4 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col gap-4">
              <h1 className='text-2xl lg:text-5xl max-w-5xl font-medium text-white dark:text-white  md:leading-snug'>
                Keponet
              </h1>
              <p className='text-sm text-muted-foreground max-w-2xl text-justify'>Sistem Penugasan Cerdas Berbasis Cloud: Platform Inovatif yang Mengintegrasikan Analitik, KPI, dan Komunikasi Langsung dalam per area Tugas, Memaksimalkan Efisiensi dan Kinerja Tim Anda. Rangkaian fitur andalan Keponet akan terus dikembangkan untuk meningkatkan performa bisnis Anda.
              </p>
            </div>
            <Link href="https://keponet.com/" target='_blank'>
              <Button className='nebula-bg rounded-xl px-3 py-2 text-sm flex items-center gap-2 border border-blue-400/30 bg-blue-500/10 font-medium  text-blue-100 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/40 '>
                Kunjungi Keponet
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <Replay source="/assets/product/keponet-vid.mp4" />
        </div>
        <FeatureGrid
          features={vlepoFeatures}
        />
      </div>
    </div>
  )
}

export default KeponetSection