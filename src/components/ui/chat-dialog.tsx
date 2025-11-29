"use client"

import React, { useEffect, useRef } from "react"
import { useState } from "react"
import { Send, X, BotMessageSquare, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "./scroll-area"
import Image from "next/image"


export interface ChatMessage {
    id: string
    role: "user" | "assistant"
    content: string
}

export interface ChatDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    messages?: ChatMessage[]
    onSendMessage?: (content: string) => void
    placeholder?: string
    isLoading?: boolean
}

export function ChatDialog({
    open,
    onOpenChange,
    messages = [],
    onSendMessage,
    placeholder = "Type a message...",
    isLoading = false,
}: ChatDialogProps) {
    const [input, setInput] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]); // Scroll to bottom when messages or loading state changes

    const handleSend = () => {
        if (!input.trim() || isLoading) return
        onSendMessage?.(input)
        setInput("")
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey && !isLoading) {
            e.preventDefault()
            handleSend()
        }
    }

    if (!open) return null


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="w-full max-w-5xl rounded-2xl border border-border nebula-card backdrop-blur-md overflow-hidden"
                aria-describedby="chat-dialog-description"
            >
                <div className="flex flex-col h-[70vh] md:h-[72vh]">
                    {/* Main */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-border">
                            <Image
                                src="https://static.dev.varnion.net.id/nextune/assets/images/logo-varnion.svg"
                                alt="logo"
                                width={100}
                                height={16}
                                className="w-24 h-14 object-contain"
                                priority
                            />

                            {/* Close */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onOpenChange(false)}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label="Close chat"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </header>

                        {/* Messages */}
                        <ScrollArea className="flex-1 px-4 md:px-6 py-6 md:py-8 min-h-0 relative">
                            {messages.length === 0 && !isLoading ? (
                                <div className="h-full flex items-center justify-center">
                                    <div className="text-center space-y-3">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                                            <BotMessageSquare className="w-6 h-6 text-primary" />
                                        </div>
                                        <p className="text-muted-foreground text-sm">Ask anything about Varnion</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 md:space-y-6 pb-4 flex flex-col">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
                                            <div
                                                className={
                                                    msg.role === "user"
                                                        ? "bg-blue-500/10 text-blue-100 px-4 py-2 rounded-xl max-w-[80%] md:max-w-[70%] border border-blue-400/30"
                                                        : "bg-white/5 text-white px-4 py-2 rounded-xl max-w-[80%] md:max-w-[70%] border border-white/10"
                                                }
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-white/5 text-white px-4 py-2 rounded-xl max-w-[80%] md:max-w-[70%] border border-white/10 flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Typing...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} /> {/* Scroll target */}
                                </div>
                            )}
                        </ScrollArea>

                        {/* Composer */}
                        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-border">
                            <div className="glass flex items-center gap-2 border border-border rounded-xl px-3 md:px-4 py-2 focus-within:ring-1 focus-within:ring-ring">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={isLoading ? "Please wait..." : placeholder}
                                    className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground shadow-none ring-0"
                                    disabled={isLoading}
                                />
                                <Button onClick={handleSend} size="icon" variant="ghost" disabled={!input.trim() || isLoading}>
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Send className="w-5 h-5" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <span id="chat-dialog-description" className="sr-only">
                    Chat panel untuk generate text, image, dan blog
                </span> */}
            </div>
        </div>
    )
}
