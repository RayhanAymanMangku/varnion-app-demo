"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Send } from "lucide-react"

interface FormField {
    id: string
    name: string
    label: string
    type: string
    placeholder: string
    orderIndex?: number
    optionForm: Array<{
        id: string
        label: string
        value: string
    }>
}

interface FormCategory {
    id: string
    websiteId: string
    name: string
    successAlert: string
    failAlert: string
    form: FormField[]
    createdAt: string
    updatedAt: string
}

interface FormBlockProps {
    categoryId?: string
    background?: string
    className?: string
}

const formCategoryCache = new Map<string, FormCategory>()

export function FormBlock({ categoryId, background, className }: FormBlockProps) {
    const [formData, setFormData] = useState<Record<string, string>>({})
    const [fileData, setFileData] = useState<Record<string, File>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [formCategory, setFormCategory] = useState<FormCategory | null>(null)

    const bg = background ?? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"

    useEffect(() => {
        if (!categoryId) {
            setFormCategory(null)
            return
        }

        const cached = formCategoryCache.get(categoryId)
        if (cached) {
            setFormCategory(cached)
            return
        }

        const fetchFormCategory = async () => {
            try {
                setIsFetching(true)

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v2/public/form/${categoryId}`,
                    {
                        cache: 'no-store',
                    }
                )

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`)
                }

                const result = await response.json()
                const data = result.data as FormCategory

                formCategoryCache.set(categoryId, data)
                setFormCategory(data)
            } catch (error) {
                console.error('[FORM-BLOCK] Error fetching form:', error)
                toast.error("Failed to load form")
            } finally {
                setIsFetching(false)
            }
        }

        fetchFormCategory()
    }, [categoryId])

    const handleInputChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (name: string, file: File | null) => {
        if (file) {
            setFileData((prev) => ({ ...prev, [name]: file }))
        } else {
            setFileData((prev) => {
                const newData = { ...prev }
                delete newData[name]
                return newData
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!categoryId || !formCategory) return

        setIsLoading(true)

        try {
            const uploadedFiles: Record<string, string> = {}

            if (Object.keys(fileData).length > 0) {
                const formDataPayload = new FormData()
                formDataPayload.append("websiteId", formCategory.websiteId)
                formDataPayload.append("categoryId", categoryId)

                for (const [fieldName, file] of Object.entries(fileData)) {
                    formDataPayload.append(fieldName, file)
                }

                const uploadResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v2/public/form/file-upload-answer`,
                    {
                        method: 'POST',
                        body: formDataPayload,
                    }
                )

                if (!uploadResponse.ok) {
                    const failMessage = formCategory.failAlert || "Failed to upload files"
                    toast.error(failMessage)
                    throw new Error('File upload failed')
                }

                const uploadResult = await uploadResponse.json()

                if (uploadResult.success && uploadResult.data) {
                    Object.assign(uploadedFiles, uploadResult.data)
                }
            }

            const finalFormData = {
                ...formData,
                ...uploadedFiles,
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v2/public/form/form-answer/${categoryId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finalFormData),
                }
            )

            if (!response.ok) {
                const failMessage = formCategory.failAlert || "Failed to submit form"
                toast.error(failMessage)
                throw new Error('Form submission failed')
            }

            const successMessage = formCategory.successAlert || "Form submitted successfully!"
            toast.success(successMessage, {
                duration: 5000,
                style: {
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                },
            })

            setFormData({})
            setFileData({})

            const form = e.target as HTMLFormElement
            form.reset()
        } catch (error) {
            console.error('[FORM-SUBMIT] Error:', error)

            if (formCategory) {
                const failMessage = formCategory.failAlert || "Failed to submit form"
                toast.error(failMessage, {
                    duration: 5000,
                    style: {
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                        border: 'none',
                    },
                })
            } else {
                toast.error("Failed to submit form")
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (!categoryId) {
        return (
            <section className="relative w-full">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div
                        className={cn("rounded-3xl py-12 sm:py-16 lg:py-20 px-8 sm:px-12 lg:px-16", className)}
                        style={{ background: bg }}
                    >
                        <div className="text-center text-white/60">
                            <p className="text-sm">No form category selected</p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (isFetching) {
        return (
            <section className="relative w-full">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div
                        className={cn("rounded-3xl py-12 sm:py-16 lg:py-20 px-8 sm:px-12 lg:px-16", className)}
                        style={{ background: bg }}
                    >
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (!formCategory) {
        return (
            <section className="relative w-full">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div
                        className={cn("rounded-3xl py-12 sm:py-16 lg:py-20 px-8 sm:px-12 lg:px-16", className)}
                        style={{ background: bg }}
                    >
                        <div className="text-center text-red-400">
                            <p className="text-sm">Form category not found</p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="relative w-full">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                <div
                    className={className}
                    style={{ background: bg }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
                        {formCategory.name}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {formCategory.form
                            .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
                            .map((field) => (
                                <div key={field.id} className="space-y-2">
                                    <label className="text-white text-sm font-medium">
                                        {field.label}
                                    </label>

                                    {field.type === "text" || field.type === "email" || field.type === "number" ? (
                                        <Input
                                            type={field.type}
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            value={formData[field.name] || ""}
                                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                                            required
                                            className="bg-white/10 backdrop-blur-sm text-white placeholder:text-white/40 border-white/10"
                                        />
                                    ) : field.type === "textarea" ? (
                                        <Textarea
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            value={formData[field.name] || ""}
                                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                                            required
                                            rows={4}
                                            className="bg-white/10 backdrop-blur-sm text-white placeholder:text-white/40 border-white/10"
                                        />
                                    ) : field.type === "dropdown" ? (
                                        <Select
                                            value={formData[field.name] || ""}
                                            onValueChange={(value) => handleInputChange(field.name, value)}
                                        >
                                            <SelectTrigger className="bg-white/10 backdrop-blur-sm text-white border-white/10">
                                                <SelectValue placeholder={field.placeholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {field.optionForm.map((option) => (
                                                    <SelectItem key={option.id} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : field.type === "image" || field.type === "document" ? (
                                        <Input
                                            type="file"
                                            name={field.name}
                                            accept={field.type === "image" ? "image/*" : ". pdf,.doc,.docx"}
                                            onChange={(e) =>
                                                handleFileChange(field.name, e.target.files?.[0] || null)
                                            }
                                            required
                                            className="bg-white/10 backdrop-blur-sm text-white border-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:cursor-pointer"
                                        />
                                    ) : null}
                                </div>
                            ))}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-6 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Submit
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}