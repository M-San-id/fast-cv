import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface AnalysisResult {
  skor: number;
  ringkasan: string;
  kekuatan: string[];
  kelemahan: string[];
  saranPerbaikan: string[];
}

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

function AIReview() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      if (!window.pdfjsLib) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error("Gagal memuat library PDF.js"));
          document.head.appendChild(script);
        });
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      }

      const pdfjsLib = window.pdfjsLib;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ");
        fullText += pageText + "\n";
      }

      if (!fullText.trim()) {
        throw new Error(
          "Tidak ada teks yang terdeteksi. Pastikan CV Anda bukan berupa gambar hasil scan.",
        );
      }
      return fullText;
    } catch (err: any) {
      console.error("Kesalahan ekstraksi PDF:", err);
      throw new Error(err.message || "Gagal membaca file PDF.");
    }
  };

  // Fungsi fetch dengan exponential backoff
  const fetchWithRetry = async (
    url: string,
    options: RequestInit,
    retries = 5,
    delay = 1000,
  ): Promise<any> => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (e) {
        if (i === retries - 1) throw e;
        await new Promise((res) => setTimeout(res, delay * Math.pow(2, i)));
      }
    }
  };

  const analyzeCV = async (cvText: string): Promise<AnalysisResult> => {
    const model = "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const promptText = `Bertindaklah sebagai Senior Recruiter dan Ahli ATS. 
    Analisis teks CV berikut secara mendalam. Berikan skor (1-10) berdasarkan standar industri, 
    ringkasan profesional, daftar kekuatan, kelemahan spesifik, dan langkah nyata perbaikan. Berikan seluruh analisis dan respon dalam bahasa yang sama dengan CV tersebut (misal: CV berbahasa Inggris maka respon dengan bahasa Inggris, jika berbahasa Indonesia maka erspon dengan bahasa Indonrsia, dan begitu untuk bahasa yang lain)
    Respon harus dalam format JSON murni.

    Teks CV:
    """
    ${cvText}
    """`;

    const payload = {
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            skor: { type: "INTEGER" },
            ringkasan: { type: "STRING" },
            kekuatan: { type: "ARRAY", items: { type: "STRING" } },
            kelemahan: { type: "ARRAY", items: { type: "STRING" } },
            saranPerbaikan: { type: "ARRAY", items: { type: "STRING" } },
          },
          required: [
            "skor",
            "ringkasan",
            "kekuatan",
            "kelemahan",
            "saranPerbaikan",
          ],
        },
      },
    };

    const data = await fetchWithRetry(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) throw new Error("Gagal mendapatkan analisis dari AI.");

    return JSON.parse(responseText) as AnalysisResult;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else if (selectedFile) {
      setError("Mohon unggah file dengan format PDF.");
      setFile(null);
    }
  };

  const handleScan = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const extractedText = await extractTextFromPDF(file);
      const aiResult = await analyzeCV(extractedText);
      setResult(aiResult);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat memproses CV Anda.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetApp = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-emerald-500";
    if (score >= 5) return "text-amber-500";
    return "text-rose-500";
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 text-slate-800 dark:text-slate-200 font-sans p-6 md:p-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <header className="text-center my-15">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            ATS{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-violet-600 dark:from-violet-600 dark:to-blue-600">
              Reviewer
            </span>{" "}
            AI
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Gunakan kekuatan AI untuk mengoptimalkan CV Anda agar lolos seleksi
            dokumen.
          </p>
        </header>

        <main className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 p-8 transition-colors duration-300">
          {!result && (
            <div className="flex flex-col items-center justify-center">
              {!isAnalyzing ? (
                <>
                  <div
                    className={`w-full max-w-lg border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer ${file ? "border-blue-500 dark:border-violet-500 bg-blue-50 dark:bg-violet-500/10" : "border-slate-300 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-violet-400 hover:bg-slate-50 dark:hover:bg-zinc-800/50"}`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    {file ? (
                      <div className="flex flex-col items-center">
                        <FileText className="w-12 h-12 text-blue-500 dark:text-violet-500 mb-4" />
                        <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                          {file.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <UploadCloud className="w-12 h-12 text-slate-400 dark:text-slate-500 mb-4" />
                        <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                          Klik untuk mengunggah PDF
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                          Maksimal ukuran file 5MB
                        </p>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 rounded-lg text-sm flex items-center gap-2 max-w-lg w-full border border-rose-100 dark:border-rose-900/50">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <button
                    onClick={handleScan}
                    disabled={!file}
                    className="mt-8 px-8 py-3 bg-linear-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 dark:from-violet-600 dark:to-blue-600 dark:hover:from-violet-700 dark:hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-300 dark:disabled:from-zinc-800 dark:disabled:to-zinc-800 disabled:text-slate-500 dark:disabled:text-zinc-500 disabled:cursor-not-allowed text-white rounded-full font-semibold transition-all shadow-md active:scale-95"
                  >
                    Mulai Analisis AI
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Loader2 className="w-16 h-16 text-blue-500 dark:text-violet-500 animate-spin mb-6" />
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                    Menganalisis...
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    AI sedang mengevaluasi konten CV Anda.
                  </p>
                </div>
              )}
            </div>
          )}
          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 p-6 md:p-10">
              <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-slate-100 dark:border-zinc-800 pb-10">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-violet-900/30 text-blue-600 dark:text-violet-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    Ringkasan AI
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                    Hasil Analisis
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    {result.ringkasan}
                  </p>
                </div>

                <div className="shrink-0 flex flex-col items-center bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-700 p-6 rounded-[2.5rem] min-w-[160px] shadow-inner">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="text-slate-200 dark:text-zinc-700"
                        strokeWidth="3"
                        stroke="currentColor"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className={`${getScoreColor(result.skor)} transition-all duration-1000 ease-out`}
                        strokeWidth="3"
                        strokeDasharray={`${result.skor * 10}, 100`}
                        strokeLinecap="round"
                        stroke="currentColor"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span
                        className={`text-4xl font-black ${getScoreColor(result.skor)}`}
                      >
                        {result.skor}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter">
                        Dari 10
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 px-4 py-1.5 bg-white dark:bg-zinc-800 rounded-full shadow-sm border border-slate-100 dark:border-zinc-700">
                    <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase">
                      Skor ATS
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 py-10">
                <div className="p-8 bg-emerald-50 dark:bg-emerald-900/10 rounded-4xl border border-emerald-100 dark:border-emerald-900/30 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity">
                    <CheckCircle className="w-20 h-20 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <h3 className="font-bold text-emerald-900 dark:text-emerald-400 mb-6 flex items-center gap-3 text-xl">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
                    </div>{" "}
                    Kekuatan
                  </h3>
                  <ul className="space-y-4">
                    {result.kekuatan.map((s, i) => (
                      <li
                        key={i}
                        className="text-sm text-emerald-800 dark:text-emerald-200 flex gap-3 font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 mt-1.5 shrink-0"></span>{" "}
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 bg-rose-50 dark:bg-rose-900/10 rounded-4xl border border-rose-100 dark:border-rose-900/30 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity">
                    <AlertTriangle className="w-20 h-20 text-rose-600 dark:text-rose-500" />
                  </div>
                  <h3 className="font-bold text-rose-900 dark:text-rose-400 mb-6 flex items-center gap-3 text-xl">
                    <div className="p-2 bg-rose-100 dark:bg-rose-900/40 rounded-xl">
                      <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-500" />
                    </div>{" "}
                    Kelemahan
                  </h3>
                  <ul className="space-y-4">
                    {result.kelemahan.map((w, i) => (
                      <li
                        key={i}
                        className="text-sm text-rose-800 dark:text-rose-200 flex gap-3 font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 dark:bg-rose-500 mt-1.5 shrink-0"></span>{" "}
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-8 bg-slate-900 border border-transparent dark:border-zinc-800 rounded-4xl text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-8 -right-8 opacity-10">
                  <Lightbulb className="w-48 h-48 text-white" />
                </div>
                <h3 className="font-bold mb-8 flex items-center gap-3 text-xl">
                  <div className="p-2 bg-slate-800 rounded-xl">
                    <Lightbulb className="w-6 h-6 text-amber-400" />
                  </div>{" "}
                  Rencana Perbaikan
                </h3>
                <div className="grid gap-4">
                  {result.saranPerbaikan.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl text-sm border border-slate-700/50 flex items-start gap-4"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-linear-to-r from-blue-600 to-violet-600 dark:from-violet-600 dark:to-blue-600 text-[10px] font-black shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-slate-300 font-medium leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  onClick={resetApp}
                  className="group flex items-center gap-3 px-8 py-3 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-600 dark:text-slate-300 rounded-full font-bold transition-all border border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600"
                >
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  Analisis CV Lainnya
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AIReview;
