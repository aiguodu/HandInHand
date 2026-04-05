import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { steps } from "../data/steps";

interface StepPanelProps {
  currentStep: number;
}

export const StepPanel: React.FC<StepPanelProps> = ({ currentStep }) => {
  return (
    <div className="w-full h-full bg-slate-50 p-8 flex flex-col overflow-y-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">
        解题步骤
      </h2>

      <div className="flex-1 relative">
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-200" />

        <div className="space-y-8 relative">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isPast = index < currentStep;
            const Icon = step.icon;

            return (
              <div
                key={index}
                className={`relative pl-16 transition-all duration-500 ${
                  isActive
                    ? "opacity-100"
                    : isPast
                      ? "opacity-60"
                      : "opacity-30"
                }`}
              >
                {/* Timeline Node */}
                <div
                  className={`absolute left-0 top-1 w-12 h-12 rounded-full flex items-center justify-center border-4 border-slate-50 transition-colors duration-500 ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : isPast
                        ? "bg-slate-300 text-slate-500"
                        : "bg-slate-200 text-slate-400"
                  }`}
                >
                  <Icon size={20} />
                </div>

                {/* Content */}
                <div
                  className={`bg-white rounded-xl p-5 shadow-sm border transition-all duration-500 ${
                    isActive
                      ? "border-blue-200 ring-2 ring-blue-50/50"
                      : "border-slate-100"
                  }`}
                >
                  <h3
                    className={`text-lg font-bold mb-2 ${isActive ? "text-blue-600" : "text-slate-700"}`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-slate-600 font-medium mb-3">{step.desc}</p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-slate-100 mt-3 text-slate-500 text-sm leading-relaxed">
                          {step.detail}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
