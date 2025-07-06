
import { useState } from "react";
import "./index.css";           // tailwind подключён

export default function App() {
  const [file, setFile] = useState(null);
  const [pct, setPct] = useState(0);
  const [stage, setStage] = useState("idle");  // idle | run | done

  const fakeRun = async () => {
    if (!file) return;
    setStage("run");
    for (let i = 1; i <= 100; i++) {
      await new Promise(r => setTimeout(r, 18));
      setPct(i);
    }
    setStage("done");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">
        Очистите звук за один клик
      </h1>

      {stage === "idle" && (
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="audio/*,video/*"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
          {file && (
            <button
              onClick={fakeRun}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl">
              Очистить «{file.name}»
            </button>
          )}
        </div>
      )}

      {stage === "run" && (
        <div className="w-full max-w-lg mt-10">
          <div className="h-3 bg-slate-200 rounded">
            <div
              className="h-3 bg-indigo-600 rounded"
              style={{ width: pct + "%" }}
            />
          </div>
          <p className="mt-2 text-center text-slate-600">Обработка… {pct}%</p>
        </div>
      )}

      {stage === "done" && (
        <div className="mt-10 text-center">
          <p className="text-lg font-semibold mb-4">Готово!</p>
          <a
            href="#"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl inline-block">
            Скачать очищенный файл
          </a>
        </div>
      )}

      <footer className="mt-20 text-slate-500 text-sm text-center max-w-md">
        5 минут аудио бесплатно в день. Сверх — €0,10/мин. Файлы удаляются через 24 ч.
      </footer>
    </div>
  );
}
