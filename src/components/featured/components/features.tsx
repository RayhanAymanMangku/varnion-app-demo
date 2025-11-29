"use client"

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { IconBox } from "@/components/ui/icon-box"

import { TrendingUp, Shield, Server, ArrowRight } from "lucide-react"
import Link from "next/link"

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Varnion High Speed",
    description: "Layanan internet Varnion premium yang andal: Koneksi Dedicated 1:1 dengan kecepatan stabil, simetris, dan akses langsung ke backbone internasional tanpa hambatan",
    color: "text-blue-300",
    href: "/",
  },
  {
    icon: Shield,
    title: "Varnion Managed Service",
    description: "Transformasikan CapEx menjadi OpEx: Tingkatkan efisiensi dengan pengelolaan jaringan Fiber dan Wi-Fi Anda, sekaligus nikmati keunggulan teknologi WiFi 6E dan kecepatan ultra 10Gb di area Anda",
    color: "text-purple-300",
    href: "/",
  },
  {
    icon: Server,
    title: "Varnion Data Center",
    description: "Optimalkan kinerja dan keamanan sistem Anda dengan solusi data center terbaru dari Varnion",
    color: "text-indigo-300",
    href: "/",
  },
]

export function Features() {
  return (
    <section id="fitur" data-aos="fade-up" suppressHydrationWarning className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold nebula-text-primary leading-snug">
              Sebagai Internet Service Provider
            </h2>
            <p className="mt-2 text-sm nebula-text-secondary max-w-2xl text-justify">
              Pionir di garis depan revolusi digital: Menghubungkan dunia dengan teknologi internet dengan visi <span className="font-medium text-blue-300 italic">“Technology for everyone”</span>, inovasi tanpa batas, membangun pondasi digital untuk bisnis Anda.
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-xl border nebula-card bg-white/5 px-3 py-2 text-sm nebula-text-secondary hover:nebula-text-primary hover:border-white/20 hover:bg-white/10"
          >
            Selengkapnya
            <span className="ml-2">→</span>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <GlassCard key={i} className="flex flex-col">
                <div>
                  <div className="flex items-center gap-3">
                    <IconBox className={`${feature.color} border border-border nebula-card`} >
                      <Icon className="h-5 w-5" />
                    </IconBox>
                    <div className="text-lg font-semibold nebula-text-primary">{feature.title}</div>
                  </div>
                  <p className="mt-3 text-sm nebula-text-secondary text-justify">{feature.description}</p>
                </div>
                <Link href={feature.href} target="_blank" className="mt-auto pt-4 w-fit">
                  <Button className="nebula-bg rounded-xl px-3 py-2 text-sm flex items-center gap-2 border border-blue-400/30 bg-blue-500/10 font-medium  text-blue-100 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/40">
                    Pelajari Lebih Lanjut
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
