"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { NavbarBlockProps } from "../types/blocks.type"

export default function NavbarBlock({ logoSrc, navLinks }: NavbarBlockProps) {
    const finalLogoSrc = logoSrc || "https://static.dev.varnion.net.id/nextune/assets/images/logo-varnion.svg"

    const finalNavLinks = navLinks || [
        { id: 1, name: "Beranda", href: "/" },
        { id: 2, name: "Layanan", href: "/layanan" },
        { id: 3, name: "Tentang Kami", href: "/about" },
        { id: 4, name: "Kontak", href: "/contact" },
    ]

    return (
        <header className="sticky top-0 pt-4 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between rounded-3xl border nebula-bg px-4 py-3 backdrop-blur-xs sm:px-6">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src={finalLogoSrc}
                            alt="logo"
                            width={100}
                            height={16}
                            className="w-28 h-16 object-contain"
                            priority
                        />
                    </Link>

                    <div className="hidden md:flex">
                        <div className="flex gap-6 items-center">
                            {finalNavLinks.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className="text-sm nebula-text-secondary hover:nebula-text-primary transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <NavigationMenu>
                                <NavigationMenuList className="flex-wrap">
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="p-0">Menu</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <div className="grid gap-4 md:w-[500px] lg:w-[800px] lg:grid-cols-[1fr_1fr]">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <MenuCard
                                                        icon={<Youtube className="h-10 w-10" />}
                                                        title="Vpedia"
                                                        desc="Pengetahuan adalah kekuatan."
                                                    />
                                                    <MenuCard
                                                        icon={<Sparkles className="h-10 w-10" />}
                                                        title="Experience"
                                                        desc="Pengalaman extraordinary."
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <ListItem href="/about/ceo" title="Meet Our CEO">
                                                        Nilai-nilai inovasi tanpa henti.
                                                    </ListItem>
                                                    <ListItem href="/about/varnioso" title="Varnioso">
                                                        Budaya dan etos kerja yang WOW.
                                                    </ListItem>
                                                    <ListItem href="/about/kontribusi" title="Kontribusi">
                                                        Komitmen bagi masyarakat.
                                                    </ListItem>
                                                    <ListItem href="/career" title="Join the Team">
                                                        Bergabung menjadi Varnioso.
                                                    </ListItem>
                                                </div>
                                            </div>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    <div>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="gap-2 rounded-xl border border-blue-400/30 bg-blue-500/10 text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/40">
                                    Kontak
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent className="nebula-bg backdrop-blur-sm">
                                <SheetHeader>
                                    <SheetTitle className="text-xl">Hubungi Kami</SheetTitle>
                                    <SheetDescription>Tinggalkan kontak, kami akan membantu Anda.</SheetDescription>
                                </SheetHeader>

                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <InputGroup label="Nama" id="name" placeholder="John Doe" />
                                    <InputGroup label="Kontak" id="contact" placeholder="Email / WA" />
                                    <InputGroup label="Perusahaan" id="company" placeholder="Nama Perusahaan" />
                                    <TextareaGroup label="Pesan" id="message" placeholder="Tulis pesan..." />
                                </div>

                                <SheetFooter>
                                    <Button className="border border-blue-400/30 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/40">
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

interface InputGroupProps {
    label: string
    id: string
    placeholder: string
}

function InputGroup({ label, id, placeholder }: InputGroupProps) {
    return (
        <div className="grid gap-3">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} placeholder={placeholder} className="border-border placeholder:text-xs text-xs" />
        </div>
    )
}

interface TextareaGroupProps {
    label: string
    id: string
    placeholder: string
}

function TextareaGroup({ label, id, placeholder }: TextareaGroupProps) {
    return (
        <div className="grid gap-3">
            <Label htmlFor={id}>{label}</Label>
            <Textarea id={id} placeholder={placeholder} className="border-border placeholder:text-xs text-xs" />
        </div>
    )
}

interface MenuCardProps {
    icon: React.ReactNode
    title: string
    desc: string
}

function MenuCard({ icon, title, desc }: MenuCardProps) {
    return (
        <Link
            href="/"
            className="from-muted/50 to-muted flex flex-col justify-start rounded-md bg-linear-to-b p-4 md:p-6 transition-all duration-200 select-none focus:shadow-md"
        >
            <div className="flex flex-col gap-2 items-start">
                {icon}
                <div className="text-lg font-medium">{title}</div>
            </div>
            <p className="text-muted-foreground text-sm mt-2">{desc}</p>
        </Link>
    )
}

interface ListItemProps {
    href: string
    title: string
    children: React.ReactNode
}

function ListItem({ title, children, href }: ListItemProps) {
    return (
        <div className="group flex flex-col gap-2 rounded-md transition hover:shadow-sm">
            <Link href={href} className="block no-underline">
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="text-muted-foreground text-sm leading-snug line-clamp-2">{children}</p>
            </Link>

            <Link href={href}>
                <Button className="nebula-bg rounded-xl px-3 py-2 text-sm flex items-center gap-2 border border-blue-400/30 bg-blue-500/10 font-medium text-blue-100 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/40">
                    Lihat
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </Link>
        </div>
    )
}