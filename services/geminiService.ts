
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function analyzeImage(base64Image: string, mimeType: string): Promise<string> {
  try {
    const prompt = `Analisis gambar ini secara mendalam dan buat laporan komprehensif tentang isinya. Jelaskan subjek utama, latar, objek-objek penting, warna, tekstur, dan suasana atau tema keseluruhan. Format output sebagai laporan terstruktur dengan judul yang jelas menggunakan Markdown. Gunakan bahasa Indonesia.

    Contoh Format Laporan:
    
    # Laporan Analisis Gambar
    
    ## Deskripsi Umum
    [Gambaran singkat tentang isi gambar.]
    
    ## Subjek Utama
    [Deskripsi detail tentang orang, hewan, atau objek utama.]
    
    ## Latar dan Lingkungan
    [Penjelasan tentang latar belakang, lokasi, dan waktu.]
    
    ## Analisis Komposisi dan Warna
    [Analisis tentang bagaimana elemen-elemen diatur dan palet warna yang digunakan.]
    
    ## Kesimpulan
    [Ringkasan dan interpretasi dari gambar secara keseluruhan.]`;

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Image,
      },
    };

    const textPart = {
      text: prompt,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Gagal berkomunikasi dengan AI. Silakan coba lagi nanti.");
  }
}
