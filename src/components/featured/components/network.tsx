"use client"

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { IconBox } from "@/components/ui/icon-box"
import { cn } from "@/lib/utils"

import { MessageCircleMore, MonitorCog, MonitorSmartphone, TrendingUp, UserPlus, Waypoints } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Network() {
  return (
    <section id="jaringan" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left  */}
          <GlassCard>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl sm:text-3xl font-semibold nebula-text-primary md:leading-snug">
                  Partner Andalan dalam Revolusi Bisnis Anda{" "}
                </h3>
                <p className="text-sm nebula-text-secondary text-justify">
                  Tim Varnioso dari Varnion telah berkomitmen selama 17 tahun untuk
                  menghadirkan solusi internet dan teknologi yang efektif, terkini,
                  mendukung kebutuhan lebih dari 400 mitra bisnis.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm"> 
              {[
                { icon: "/assets/anab.png" },
                { icon: "/assets/kan.png" },
                { icon: "/assets/bsi.png" },
              ].map((metric, i) => (
                <div
                  key={i}
                >
                  <Image
                    src={metric.icon}
                    alt="logo"
                    width={200} 
                    height={100}
                    className="w-full h-25 object-contain"
                  />
                </div>
              ))}
            </div>
            <Link href="/our-solutions/why-varnion">
              <Button className="mt-4 rounded-xl border nebula-card bg-white/5 px-3 py-2 text-sm nebula-text-secondary hover:nebula-text-primary hover:border-white/20 hover:bg-white/10">
                Why Varnion
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </GlassCard>

          {/* Right */}
          <div className="flex flex-col gap-6">
            <GlassCard>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl sm:text-3xl font-semibold nebula-text-primary">
                  Layanan
                </h3>
              </div>
              <p className="mt-2 text-sm nebula-text-secondary">
                Varnion Internet menyediakan layanan internet dengan kualitas terbaik dan
                cepat untuk memenuhi kebutuhan Anda.
              </p>

              <div
                className={cn(
                  "mt-4 grid grid-cols-3",
                  "rounded-xl border",
                  "divide-x divide-y ",
                  "overflow-hidden"
                )}
              >
                {[
                  {
                    icon: <MonitorSmartphone className="h-5 w-5" />,
                    title: "App Based Solution",
                  },
                  {
                    icon: <UserPlus className="h-5 w-5 text-blue-100" />,
                    title: "100% SLA",
                  },
                  {
                    icon: <MessageCircleMore className="h-5 w-5 text-blue-100" />,
                    title: "Personal Assistant Manager",
                  },
                  {
                    icon: <MonitorCog className="h-5 w-5 text-blue-100" />,
                    title: "Superior Service",
                  },
                  {
                    icon: <TrendingUp className="h-5 w-5 text-blue-100" />,
                    title: "Infrastruktur Terdepan",
                  },
                  {
                    icon: <Waypoints className="h-5 w-5 text-blue-100" />,
                    title: "Sustainable Invention",
                  },
                ].map((metric, i) => (
                  <div
                    key={i}
                    className="p-3 flex flex-col gap-2 items-center justify-center"
                  >
                    {metric.icon && (
                      <IconBox className="bg-white/10">{metric.icon}</IconBox>
                    )}
                    <h4 className="text-sm font-medium text-center nebula-text-primary">
                      {metric.title}
                    </h4>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
