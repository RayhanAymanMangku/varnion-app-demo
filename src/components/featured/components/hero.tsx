"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, Router, Star, MapPin, Clock, Instagram, Linkedin, Mail } from "lucide-react"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import "vimond-replay/index.css"
import Image from "next/image"
import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"
import { IconBox } from "@/components/ui/icon-box"


const Replay = dynamic(
  () => import("vimond-replay").then((mod) => mod.Replay),
  { ssr: false },
)

export function Hero() {
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);

  useEffect(() => {
    const checkOfficeHours = () => {
      const now = new Date();
      const nowWIB = new Date(now.getTime() + 7 * 60 * 60 * 1000);

      const dayWIB = nowWIB.getUTCDay();
      const hourWIB = nowWIB.getUTCHours();

      const isWeekday = dayWIB >= 1 && dayWIB <= 5; // Senin - Jumat
      const isWithinHours = hourWIB >= 8 && hourWIB < 17; // Jam 08:00 - 16:59
      const isOpen = isWeekday && isWithinHours;
      setIsOfficeOpen(isOpen);
    };

    checkOfficeHours();
  }, []);

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative grid items-center gap-10 py-20 md:grid-cols-2 lg:py-28">
          {/* Left Content */}
          <div className="relative">
            <Badge variant="success" className="flex gap-2 items-center w-fit md:mx-0 mx-auto">
              <span className="inline-flex h-2 w-2 rounded-full bg-green-400" />
              <span>Online</span>
            </Badge>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-center md:text-left">
              Internet Service Provider Dengan Solusi  <span className="text-gradient">Berbasis Aplikasi</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm nebula-text-secondary md:text-left text-center">
              Perluas transformasi digital bisnis Anda dengan solusi koneksi internet dan aplikasi generasi terkini dari Varnion.
            </p>

            {/* CTA Buttons */}
            <div className="mt-7 flex flex-col md:flex-row items-center gap-3">
              <Button className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-2.5 text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/40">
                <Wifi className="h-4 w-4" />
                Varnion Internet
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border nebula-card bg-white/5 px-4 py-2.5 text-sm nebula-text-secondary hover:nebula-text-primary hover:border-white/20 hover:bg-white/10"
              >
                <Router className="h-4 w-4" />
                Varnion CloudOne
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { icon: <Instagram className="w-4 h-4" />, value: "Instagram", href: "https://www.instagram.com/varnionsemesta/" },
                { icon: <Linkedin className="w-4 h-4" />, value: "Linkedin", href: "https://id.linkedin.com/company/pt-varnion-technology-semesta" },
                { icon: <Mail className="w-4 h-4" />, value: "Mail", href: "mailto:cs@varnion.net.id" },
              ].map((stat, i) => (
                <GlassCard key={i} className="p-3 ">
                  <Link href={stat.href} target="_blank" className="flex gap-2 items-center justify-center cursor-pointer">
                    {stat.icon}
                    <div className="text-sm nebula-text-secondary md:block hidden">{stat.value}</div>
                  </Link>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Card */}
          <div className="relative">
            <GlassCard className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <IconBox className="text-blue-300">
                    <Image
                      src="/assets/varnion-icon.png"
                      alt="logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-fill rounded-lg"
                    />
                  </IconBox>
                  <div>
                    <div className="text-sm font-semibold">Varnion Technology Semesta</div>
                    <div className="text-xs text-muted-foreground">Internet Service Provider</div>
                  </div>
                </div>
                <Badge variant={isOfficeOpen ? "success" : "destructive"} className="flex gap-2 items-center w-fit">
                  <span className={`${isOfficeOpen ? "bg-green-400" : "bg-red-400"} inline-flex h-2 w-2 rounded-full`} />
                  {isOfficeOpen ? "Open" : "Closed"}
                </Badge>
              </div>

              {/* Performance Grid */}
              <div className="mt-5 grid md:grid-cols-3 gap-3">
                {[
                  { icon: Star, label: "Rating", value: "4.3", desc: "Google", color: "text-yellow-300" },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Indonesia",
                    desc: "South Jakarta",
                    color: "text-green-300",
                  },
                  { icon: Clock, label: "Open Hours", value: "08.00 - 17.00", desc: "Service Time (WIB)", color: "text-indigo-300" },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="rounded-xl border nebula-bg backdrop-blur-xs inset-0 p-4">
                      <div className="flex items-center gap-2 text-xs nebula-text-secondary">
                        <Icon className={`h-4 w-4 ${item.color}`} />
                        {item.label}
                      </div>
                      <div className="mt-1 text-lg font-semibold nebula-text-primary">{item.value}</div>
                      <div className="text-xs nebula-text-secondary">{item.desc}</div>
                    </div>
                  )
                })}
              </div>

              {/* Image Placeholder */}
              <div className="mt-5 rounded-xl border nebula-card overflow-hidden">
                <Replay
                  source="https://cdn.varnion.net.id/videos/kaleidoskop.mp4" />
              </div>
            </GlassCard>

            {/* Glow Effects */}
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(3,102,214,0.18), rgba(0,0,0,0))" }}
            />
            <div
              className="pointer-events-none absolute -bottom-8 -left-8 h-60 w-60 blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(168,85,247,0.35), rgba(0,0,0,0))" }}
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section >
  )
}
