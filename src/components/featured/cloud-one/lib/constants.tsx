import { Activity, AppWindow, BellRing, CircleUserRound, Globe, LayoutDashboard, Megaphone, Monitor, MonitorCloud, Rss, Users, Waypoints } from 'lucide-react'

export const megalosFeatures = [
    {
        id: 1,
        title: "Smart Bandwidth & User Management System",
        description: "Kelola aktivitas pengguna dan perangkat mereka secara bersamaan dan real time",
        icon: <Activity className='w-4 h-4' />
    },
    {
        id: 2,
        title: "PMS Interfacing",
        description: "Integrasikan dengan mudah ke PMS yang tersedia di property Anda",
        icon: <Waypoints className='w-4 h-4'/>
    },
    {
        id: 3,
        title: "Login Media Sosial",
        description: "Integrasikan login mediasosial untuk terkoneksi ke internet",
        icon: <Rss className='w-4 h-4'/>
    },
    {
        id: 4,
        title: "Multiple Login Page",
        description: "Tampilan login page yang berbeda di tiap ruangan atau area",
        icon: <CircleUserRound className='w-4 h-4'/>
    },
    {
        id: 5,
        title: "Pengguna serentak",
        description: "Kelola seluruh pengguna secara bersamaan dengan mudah",
        icon: <Users className='w-4 h-4'/>
    },
    {
        id: 6,
        title: "Kemampuan Roaming",
        description: "Tak perlu login berulang kali selama berada di satu area",
        icon: <Globe className='w-4 h-4'/>
    }
]

export const vlepoFeatures = [
    {
        id: 1,
        title: "Vlepo Dashboard",
        description: "User-friendly dashboard untuk mengatur seluruh TV pada properti Anda.",
        icon: <LayoutDashboard className='w-4 h-4' />
    },
    {
        id: 2,
        title: "Content Management System",
        description: "Atur dan edit content yang mau Anda tampilkan, tanpa perlu pengetahuan programming.",
        icon: <AppWindow className='w-4 h-4'/>
    },
    {
        id: 3,
        title: "PMS Integration",
        description: "Integrasi dengan PMS berbasis cloud atau non-cloud",
        icon: <MonitorCloud className='w-4 h-4'/>
    },
    {
        id: 4,
        title: "Broadcast Announcement/Emergency Alert",
        description: "Siarkan pengumuman atau info darurat secara cepat.",
        icon: <Megaphone className='w-4 h-4'/>
    },
    {
        id: 5,
        title: "Guest Personalized Messages",
        description: "Dapatkan kemudahan mengirim message langsung ke TV Anda, dengan push notification secara realitime.",
        icon: <Users className='w-4 h-4'/>
    },
    {
        id: 6,
        title: "Promotions",
        description: "Sesuaikan promosi atau digital signage untuk memikat user.",
        icon: <BellRing className='w-4 h-4'/>
    },
    {
        id: 7, 
        title: "Chromecast Isolation Engine",
        description: "Privacy dan Security policy, membuat hanya 1 TV hanya bisa dicasting atau diview oleh user.",
        icon: <Monitor className='w-4 h-4'/>
    }
]