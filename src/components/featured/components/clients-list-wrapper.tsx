import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ClientsListWrapper = () => {
    return (
        <div className="flex flex-col gap-4 md:flex-row justify-between w-full md:items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
            <div className="flex flex-col gap-2">
                <h3 className="text-2xl sm:text-3xl font-semibold  nebula-text-primary leading-snug">Mitra dan Partner Kebanggaan</h3>
                <p className="max-w-xl text-sm nebula-text-secondary text-justify">
                    Lebih dari 400+ Mitra Bisnis dan Usaha Telah Dipercayakan pada Varnion untuk Integrasi Internet dan Teknologi.
                </p>
            </div>
            <Link href="/our-solutions/our-clients">
                <Button className="w-fit rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-2.5 text-sm font-medium  text-blue-100 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/40">
                    Lihat Semua Mitra
                    <ArrowRight className="h-[18px] w-[18px] mr-2" />
                </Button>
            </Link>

        </div>

    )
}

export default ClientsListWrapper