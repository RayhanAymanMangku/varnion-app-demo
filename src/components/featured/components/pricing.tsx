"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import Link from "next/link"

const PRICING_TIERS = [
  {
    id: 1,
    logo: "/assets/megalos.png",
    badge: "Featured",
    title: "Megalos",
    desc: "Application",
    features: ["Smart Bandwidth & User Management System", "PMS Interfacing", "Login Media Sosial", "Multiple Login Page", "Pengguna serentak", "Kemampuan Roaming"],
    highlighted: false,
    href: "/cloud-one/megalos",
  },
  {
    id: 2,
    logo: "/assets/vlepo.png",
    badge: "Featured",
    title: "Vlepo",
    desc: "Application",
    features: ["VLEPO Dashboard", "Content Management System", "PMS Integration", "Broadcast Announcement/Emergency Alert", "Guest Personalized Messages", "Promotions", "Chromecast Isolation Engine"],
    highlighted: true,
    href: "/cloud-one/vlepo",
  },
  {
    id: 3,
    logo: "/assets/keponet.png",
    badge: "Featured",
    title: "Keponet",
    desc: "Application",
    features: ["Task Escalation Monitoring", "Task Tracking System", "Kepolytics", "Chat in Task", "Alert/Broadcast Notification", "Kepo QR"],
    highlighted: false,
    href: "/cloud-one/keponet",
  },
]

export function Pricing() {
  return (
    <section data-aos="fade-up" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold  nebula-text-primary leading-snug">Varnion CloudOne</h2>
          <p className="mt-2 text-sm nebula-text-secondary max-w-2xl text-justify">
            Revolusi bisnis Anda dengan solusi cloud terintegrasi. Nikmati pengelolaan bandwidth yang superior, sistem manajemen tugas yang canggih, dan kontrol TV manajemen yang intuitif.     </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mt-16">
          {PRICING_TIERS.map((tier) => (
            <GlassCard
              key={tier.id}
              data-aos={
                tier.id === 1 ? "fade-right" :
                  tier.id === 2 ? "fade-up" :
                    tier.id === 3 ? "fade-left" :
                      "fade-up"
              }
              data-aos-offset="200"
              data-aos-delay={tier.id === 1 ? "100" : tier.id === 2 ? "200" : tier.id === 3 ? "300" : "0"}
              className={`flex flex-col ${tier.highlighted ? " bg-purple-500/10 border-purple-400/30 md:-translate-y-8 hover:border-purple-400/30" : "hover:border-blue-400/30 transition-all duration-300 "}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <Image
                    src={tier.logo}
                    alt={tier.title}
                    width={56}
                    height={40}
                    className="w-12 h-12 object-contain rounded-lg"
                  />
                  <Badge variant={tier.highlighted ? "purple" : "primary"}>{tier.badge}</Badge>
                </div>

                <div className="mt-4">
                  <div className="text-2xl sm:text-3xl font-semibold nebula-text-primary">{tier.title}</div>
                  <div className={`mt-1 text-sm ${tier.highlighted ? "text-muted-foreground" : "text-muted-foreground"}`}>
                    {tier.desc}
                  </div>
                </div>

                <ul
                  className={`mt-5 space-y-2 text-sm ${tier.highlighted ? "text-white" : "nebula-text-secondary"}`}
                >
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${tier.highlighted ? "bg-purple-400" : "bg-blue-500"}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-6 flex items-end justify-between">
                <Link href={tier.href}>
                  <Button
                    className={`rounded-xl px-3 py-2 text-sm nebula-bg ${tier.highlighted
                      ? "border border-purple-400/30 bg-purple-500/10 text-purple-100 hover:bg-purple-500/20"
                      : "border border-blue-400/30  text-blue-100 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
                      }`}
                  >
                    Selengkapnya
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  )
}
