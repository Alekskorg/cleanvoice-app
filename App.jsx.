import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CloudUpload, CheckCircle } from "lucide-react";

export default function CleanVoiceApp() {
  /** UI state */
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<"idle" | "uploading" | "processing" | "done">("idle");
  const [progress, setProgress] = useState<number>(0);
  const [resultUrl, setResultUrl] = useState<string>("");

  /** Handlers */
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files[0]);
  };

  const simulateUpload = async () => {
    if (!file) return;
    setStage("uploading");
    // fake upload progress
    for (let i = 1; i <= 30; i++) {
      await new Promise((r) => setTimeout(r, 40));
      setProgress(i * 3);
    }
    setStage("processing");
    // fake processing
    for (let i = 30; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 120));
      setProgress(i);
    }
    // normally: fetch cleaned file URL from backend
    setResultUrl("https://cdn.example.com/cleaned-" + file.name);
    setStage("done");
  };

  const resetAll = () => {
    setFile(null);
    setStage("idle");
    setProgress(0);
    setResultUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center p-6">
      {/* HERO */}
      <header className="text-center max-w-2xl my-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Очистите звук за один клик
        </h1>
        <p className="text-lg text-slate-600">
          Загружайте аудио или видео — мы уберём шум, эхо и вентиляцию
          мгновенно. Первые 5&nbsp;минут&nbsp;— бесплатно, без регистрации.
        </p>
      </header>

      {/* UPLOAD CARD */}
      {stage === "idle" && (
        <Card className="w-full max-w-lg shadow-xl">
          <CardContent className="p-10 flex flex-col items-center gap-4">
            <label className="w-full flex flex-col items-center gap-2 cursor-pointer p-8 border-2 border-dashed border-slate-300 rounded-2xl hover:bg-slate-50 transition">
              <CloudUpload className="w-10 h-10 text-slate-500" />
              <span className="text-slate-600">Перетащите файл или кликните для выбора</span>
              <input type="file" accept="audio/*,video/*" className="hidden" onChange={handleFile} />
            </label>
            {file && (
              <Button size="lg" className="w-full" onClick={simulateUpload}>
                Очистить «{file.name}»
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* PROGRESS CARD */}
      {stage !== "idle" && stage !== "done" && (
        <Card className="w-full max-w-lg shadow-xl animate-fade-in">
          <CardContent className="p-8 flex flex-col gap-6 items-center">
            <Progress value={progress} className="w-full" />
            <p className="text-slate-600">
              {stage === "uploading" ? "Загрузка…" : "Обработка…"} {progress}%
            </p>
          </CardContent>
        </Card>
      )}

      {/* RESULT CARD */}
      {stage === "done" && (
        <Card className="w-full max-w-lg shadow-xl animate-fade-in">
          <CardContent className="p-10 flex flex-col items-center gap-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <p className="text-xl font-semibold text-slate-800">Готово!</p>
            <a
              href={resultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold shadow"
            >
              Скачать очищенный файл
            </a>
            <Button variant="outline" onClick={resetAll}>
              Очистить ещё
            </Button>
          </CardContent>
        </Card>
      )}

      <footer className="mt-20 text-slate-400 text-sm text-center max-w-xl">
        <p>
          5 минут аудио ежедневно бесплатны. Сверх лимита — €0,10/мин. Оплата через Stripe. Файлы автоматически удаляются
          через 24&nbsp;часа.
        </p>
      </footer>
    </div>
  );
}
