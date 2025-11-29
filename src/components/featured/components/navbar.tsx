"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Youtube } from "lucide-react"
import Image from "next/image"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navLists } from "../lib/constants"
import { useIsMobile } from "../hooks/use-mobile"
import { cn } from "@/lib/utils"

export function Navbar() {
  const isMobile = useIsMobile()

  return (
    <header className="sticky top-0 z-50 pt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between rounded-3xl border nebula-bg px-4 py-3 backdrop-blur-xs inset-0 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://static.dev.varnion.net.id/nextune/assets/images/logo-varnion.svg"
              alt="logo"
              width={100}
              height={16}
              className="w-28 h-16 object-contain"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex">
            <div className="flex gap-6 items-center">
              {navLists.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-sm nebula-text-secondary hover:nebula-text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <NavigationMenu viewport={isMobile}>
                <NavigationMenuList className="flex-wrap">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="p-0">Menu</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-4 md:w-[500px] lg:w-[800px] lg:grid-cols-[1fr_1fr]">
                        {/* Bagian kiri: Vpedia */}
                        <div className="h-full">
                          <div className="grid grid-cols-2 gap-2 h-full">
                            <div className="flex flex-col grow">
                              <Link
                                href="/"
                                className="from-muted/50 to-muted flex flex-col justify-start rounded-md bg-linear-to-b p-4 md:p-6 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md h-full"
                              >
                                <div className="flex flex-col gap-2 items-start">
                                  <Youtube className="h-10 w-10" />
                                  <div className="text-lg font-medium sm:mt-2">Vpedia</div>
                                </div>
                                <p className="text-muted-foreground text-sm leading-tight mt-2">
                                  Pengetahuan adalah kekuatan, membagikannya adalah pemberdayaan.
                                </p>
                              </Link>
                            </div>

                            {/* Experience */}

                            <div className="flex flex-col grow">
                              <Link
                                href="/"
                                className="from-muted/50 to-muted flex flex-col justify-start rounded-md bg-linear-to-b p-4 md:p-6 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md h-full"
                              >
                                <div className="flex flex-col gap-2 items-start">
                                  <Sparkles className="h-10 w-10" />
                                  <div className="text-lg font-medium sm:mt-2">Experience</div>
                                </div>
                                <p className="text-muted-foreground text-sm leading-tight mt-2">
                                  Pengalaman extraordinary untuk klien kami.
                                </p>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Bagian kanan: 4 item */}
                        <div className="grid grid-cols-2 gap-3">
                          <ListItem href="/about/ceo" title="Meet Our CEO">
                            Nilai-nilai seperti inovasi tanpa henti demi mewujudkan teknologi bagi semua orang.
                          </ListItem>

                          <ListItem href="/about/varnioso" title="Varnioso">
                            Tim yang telah tumbuh bersama dengan budaya dan etos kerja yang WOW.
                          </ListItem>

                          <ListItem href="/about/kontribusi" title="Kontribusi">
                            Komitmen kami adalah berkontribusi secara positif bagi masyarakat, bangsa dan dunia.
                          </ListItem>

                          <ListItem href="/career" title="Join the Team">
                            Kesempatan bergabung dan menjadi Varnioso.
                          </ListItem>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="gap-2 rounded-xl border border-blue-400/30 bg-blue-500/10 text-sm font-medium  text-blue-100 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/40">
                  Kontak
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="nebula-bg backdrop-blur-sm">
                <SheetHeader>
                  <SheetTitle className="text-xl">Hubungi Varnion</SheetTitle>
                  <SheetDescription>Tinggalkan kontak dan Varnioso akan segera membantu Anda.</SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                      className="border-border placeholder:text-xs text-xs"
                      id="sheet-demo-name"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="contact">Kontak</Label>
                    <Input
                      className="border-border placeholder:text-xs text-xs"
                      id="contact"
                      placeholder="example.com"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="company">Nama Perusahaan</Label>
                    <Input
                      className="border-border placeholder:text-xs text-xs"
                      id="company"
                      placeholder="Your company name"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      className="border-border placeholder:text-xs text-xs"
                      id="message"
                      placeholder="Your message for us"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <Button
                    type="submit"
                    className="border border-blue-400/30 bg-blue-500/10 px-3 py-2 text-sm font-medium  text-blue-100 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/40"
                  >
                    Send
                  </Button>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}

function ListItem({
  title,
  children,
  href,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { href: string; title: string }) {
  return (
    <div
      role="listitem"
      {...props}
      className={cn("group flex flex-col gap-2 rounded-md transition hover:shadow-sm focus-within:shadow-sm", className)}
    >
      <NavigationMenuLink asChild>
        <Link href={href} className="block no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-sm">
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
      <Link href={href}>
        <Button className='nebula-bg rounded-xl px-3 py-2 text-sm flex items-center gap-2 border border-blue-400/30 bg-blue-500/10 font-medium  text-blue-100 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/40 '>
          Lihat
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}
