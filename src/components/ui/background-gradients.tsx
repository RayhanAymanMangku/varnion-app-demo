"use client"

import { ChatMessage } from "@/components/ui/chat-dialog"
import dynamic from "next/dynamic"
import React, { useState, useCallback, useEffect } from "react"
import { Button } from "./button"
import { MessageCircle } from 'lucide-react';
import { Navbar } from "../featured/components/navbar";
import { Footer } from "../featured/components/footer";

const ChatDialogDynamic = dynamic(() =>
  import("@/components/ui/chat-dialog").then((mod) => mod.ChatDialog)
)

export function BackgroundGradients({ children }: { children: React.ReactNode }) {
  const [isSubdomain, setIsSubdomain] = useState(false);
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'varnion-app.online';
    const hostname = window.location.hostname;

    setIsSubdomain(
      hostname !== mainDomain &&
      hostname !== `www.${mainDomain}` &&
      hostname.endsWith(`.${mainDomain}`)
    );
  }, []);

  const handleSend = useCallback(async (content: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
    }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "Maaf, terjadi kesalahan saat memproses permintaan Anda.",
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (error) {
      console.error("Failed to send message to chatbot API:", error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Maaf, saya tidak dapat terhubung dengan layanan chatbot saat ini. Silakan coba lagi nanti.",
      }
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div
          className="absolute inset-0"
          style={{
            background: `
            radial-gradient(1200px 600px at 80% -10%, rgba(3,102,214,0.22), transparent 60%),
            radial-gradient(900px 500px at 10% 10%, rgba(2,132,199,0.16), transparent 55%),
            radial-gradient(800px 500px at 60% 110%, rgba(30,64,175,0.22), transparent 60%),
            radial-gradient(500px 400px at 10% 90%, rgba(15,118,110,0.15), transparent 60%),
            radial-gradient(800px 500px at 50% 95%, rgba(79, 70, 229, 0.20), transparent 60%),
            #000000
          `,
          }}
        />

        <div
          className="absolute inset-0 mix-blend-soft-light opacity-60"
          style={{
            backgroundImage: `
            radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
            backgroundSize: "20px 20px, 40px 40px",
            backgroundPosition: "0 0, 10px 10px",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(1200px 800px at 50% 20%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {!isSubdomain && <Navbar />}

      <div className="min-h-screen w-full">
        <div className="overflow-hidden">
          {children}
        </div>
        {!isSubdomain && <Footer />}
      </div>

      <Button
        variant="default"
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-2 text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/40"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      <ChatDialogDynamic
        open={open}
        onOpenChange={setOpen}
        messages={messages}
        onSendMessage={handleSend}
        isLoading={isLoading}
      />
    </div>
  )
}