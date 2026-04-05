import React, { useState, useEffect } from "react";
import {
  Play,
  Square,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { GeometrySVG } from "./components/GeometrySVG";
import { StepPanel } from "./components/StepPanel";
import { SubtitleOverlay } from "./components/SubtitleOverlay";
import { TTSService } from "./services/ttsService";
import { steps } from "./data/steps";

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [subtitle, setSubtitle] = useState("");

  // Handle step change
  useEffect(() => {
    TTSService.stop();
    setIsPlaying(false);
    setSubtitle("");
  }, [currentStep]);

  const handlePlay = () => {
    if (isPlaying) {
      TTSService.stop();
      setIsPlaying(false);
      setSubtitle("");
    } else {
      setIsPlaying(true);
      TTSService.play(
        steps[currentStep].tts,
        (text) => setSubtitle(text),
        () => {
          setIsPlaying(false);
          setSubtitle("");
        },
      );
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const restart = () => {
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-slate-100 flex items-center justify-between px-8 bg-white shrink-0">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-bold rounded-full">
              几何动点最值
            </span>
            <h1 className="text-xl font-bold text-slate-800">
              等腰直角三角形旋转与线段和最小值
            </h1>
          </div>
          <div className="text-sm font-medium text-slate-400">
            步骤 {currentStep + 1} / {steps.length}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="h-[570px] flex w-full relative">
          {/* Left: Visual/SVG Area */}
          <div className="w-full md:w-[55%] h-full relative bg-white shrink-0">
            <GeometrySVG step={currentStep} />
            <SubtitleOverlay text={subtitle} isVisible={isPlaying} />
          </div>

          {/* Right: Logic/Steps Area */}
          <div className="w-full md:w-[45%] h-full border-l border-slate-100 shrink-0">
            <StepPanel currentStep={currentStep} />
          </div>
        </main>

        {/* Footer Controls */}
        <footer className="h-20 border-t border-slate-100 bg-white px-8 flex items-center justify-between shrink-0">
          <button
            onClick={restart}
            className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors font-medium"
          >
            <RotateCcw size={18} />
            重新开始
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg transition-colors font-medium"
            >
              <ChevronLeft size={20} />
              上一步
            </button>

            <button
              onClick={handlePlay}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
                isPlaying
                  ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/30"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/30"
              }`}
            >
              {isPlaying ? (
                <>
                  <Square size={18} className="fill-current" />
                  停止讲解
                </>
              ) : (
                <>
                  <Play size={18} className="fill-current" />
                  播放讲解
                </>
              )}
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg transition-colors font-medium"
            >
              下一步
              <ChevronRight size={20} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
