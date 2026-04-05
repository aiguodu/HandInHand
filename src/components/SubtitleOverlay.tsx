import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface SubtitleOverlayProps {
  text: string;
  isVisible: boolean;
}

export const SubtitleOverlay: React.FC<SubtitleOverlayProps> = ({
  text,
  isVisible,
}) => {
  return (
    <AnimatePresence>
      {isVisible && text && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50 pointer-events-none"
        >
          <div className="bg-slate-900/80 backdrop-blur-md rounded-xl px-6 py-4 shadow-2xl border border-white/10">
            <p className="text-white text-lg text-center leading-relaxed tracking-wide font-medium">
              {text}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
