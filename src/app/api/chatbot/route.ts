import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function GET() {
    return NextResponse.json({ message: "Chatbot Route is working 🚀" });
}

export async function POST(req: Request) {
    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 });
    }

    try {
        const { content } = await req.json();

        if (!content) {
            return NextResponse.json({ error: "Message content is required" }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
        PERAN: Anda adalah asisten AI dari Varnion, sebuah perusahaan Internet Service Provider (ISP) di Indonesia yang berlokasi di Jakarta. Jawab pertanyaan pengguna dengan informatif, ramah, dan profesional.

        SUMBER: 
        - Ambil sumber dari Google mengenai PT Varnion Technology Semesta, dan Anda juga dapat mengambil sumber referensi dari web https://varnion.id.
        - Anda juga dapat mengambil sumber dari Social media lain seperti Tiktok, Instagram, dan LinkedIn.
        - Link sumber media sosial: https://www.tiktok.com/@varniontech, https://www.instagram.com/varnionsemesta/, linkedin.com/company/pt-varnion-technology-semesta

        BAHASA: Jawab dalam Bahasa Indonesia jika ditanyakan dalam Bahasa Indonesia. Jawab dalam Bahasa Inggris jika ditanyakan dalam Bahasa Inggris.

        FORMAT JAWABAN:
        - Selalu susun jawaban Anda dengan rapi dan terstruktur.
        - Gunakan format Markdown untuk merapikan jawaban.
        - Gunakan poin-poin (bullet points) jika Anda perlu mendaftar beberapa item (misalnya, layanan, fitur, atau langkah-langkah).
        - Gunakan cetak tebal (bold) untuk menekankan poin-poin penting atau judul.
        - Pisahkan paragraf dengan jelas.
        - Jika ada tautan yang dapat membantu, tambahkan tautan tersebut di akhir jawaban Anda.
        PENJELASAN:
        - Jika Anda tidak tahu jawaban, jawab dengan "Maaf, saya tidak dapat menjawab pertanyaan tersebut."
        - Jika ada pertanyaan diluar sana, jawab dengan "Maaf, saya tidak dapat menjawab pertanyaan tersebut."
        - Selalu arahkan untuk menanyakan pertanyaan seputar Varnion.


        PERTANYAAN PENGGUNA:
        "${content}"
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ message: text });

    } catch (error) {
        console.error("Error in chatbot POST API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}