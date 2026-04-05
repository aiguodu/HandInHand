import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface GeometrySVGProps {
  step: number;
}

export const GeometrySVG: React.FC<GeometrySVGProps> = ({ step }) => {
  // SVG Coordinate System (y goes down)
  // Unit length = 200px
  const B = { x: 300, y: 400 };
  const A = { x: 300, y: 200 };
  const C = { x: 500, y: 400 };
  const A_prime = { x: 100, y: 400 };
  const C_prime = { x: 100, y: 0 };

  // P is on AC (e.g., x=0.6)
  const P = { x: 420, y: 320 };
  // Q is P rotated 90 deg CCW around B
  const Q = { x: 220, y: 280 };
  // Q* is intersection of BC' and A'A
  const Q_star = { x: 233.3, y: 266.7 };

  // Helper to generate path string
  const path = (...points: { x: number; y: number }[]) =>
    `M ${points.map((p) => `${p.x},${p.y}`).join(" L ")}`;

  return (
    <div className="w-full h-full relative bg-white flex items-start justify-start p-4">
      <svg viewBox="0 0 600 500" preserveAspectRatio="xMinYMin meet" className="w-full h-full">
        {/* Base Grid / Axes (Step 4) */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="stroke-slate-200"
              strokeWidth="2"
            >
              {/* X axis */}
              <line x1="50" y1="450" x2="550" y2="450" />
              <polygon points="550,445 560,450 550,455" fill="#e2e8f0" />
              <text
                x="540"
                y="470"
                className="fill-slate-400 text-sm font-serif italic"
              >
                x
              </text>
              {/* Y axis */}
              <line x1="300" y1="480" x2="300" y2="30" />
              <polygon points="295,30 300,20 305,30" fill="#e2e8f0" />
              <text
                x="280"
                y="40"
                className="fill-slate-400 text-sm font-serif italic"
              >
                y
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Highlight Triangles (Step 1) */}
        <AnimatePresence>
          {step === 1 && (
            <motion.polygon
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              points={`${A_prime.x},${A_prime.y} ${B.x},${B.y} ${Q.x},${Q.y}`}
              className="fill-blue-500/10"
            />
          )}
          {step === 1 && (
            <motion.polygon
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              points={`${C.x},${C.y} ${B.x},${B.y} ${P.x},${P.y}`}
              className="fill-blue-500/10"
            />
          )}
        </AnimatePresence>

        {/* Base Triangle ABC */}
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          className="fill-transparent stroke-slate-800"
          strokeWidth="2"
        />

        {/* Trajectory Triangle A'BA (Step 1+) */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.polygon
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              points={`${A_prime.x},${A_prime.y} ${B.x},${B.y} ${A.x},${A.y}`}
              className="fill-transparent stroke-slate-400"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          )}
        </AnimatePresence>

        {/* Trajectory Line A'A (Step 1+) */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ opacity: 0 }}
              x1={A_prime.x - 50}
              y1={A_prime.y + 50}
              x2={A.x + 50}
              y2={A.y - 50}
              className="stroke-blue-500"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}
        </AnimatePresence>

        {/* P and Q Lines (Step 0, 1, 2) */}
        <AnimatePresence>
          {step <= 2 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <line
                x1={B.x}
                y1={B.y}
                x2={P.x}
                y2={P.y}
                className="stroke-slate-800"
                strokeWidth="2"
              />
              <line
                x1={B.x}
                y1={B.y}
                x2={Q.x}
                y2={Q.y}
                className="stroke-slate-800"
                strokeWidth="2"
              />
              <line
                x1={C.x}
                y1={C.y}
                x2={Q.x}
                y2={Q.y}
                className="stroke-slate-800"
                strokeWidth="2"
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Highlight BQ + CQ (Step 0) */}
        <AnimatePresence>
          {step === 0 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.line
                x1={B.x}
                y1={B.y}
                x2={Q.x}
                y2={Q.y}
                className="stroke-red-500"
                strokeWidth="3"
                animate={{ strokeWidth: [3, 5, 3] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.line
                x1={C.x}
                y1={C.y}
                x2={Q.x}
                y2={Q.y}
                className="stroke-red-500"
                strokeWidth="3"
                animate={{ strokeWidth: [3, 5, 3] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Symmetry Lines (Step 3+) */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                x1={C.x}
                y1={C.y}
                x2={C_prime.x}
                y2={C_prime.y}
                className="stroke-emerald-500"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                x1={B.x}
                y1={B.y}
                x2={C_prime.x}
                y2={C_prime.y}
                className="stroke-red-500"
                strokeWidth="3"
              />
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                x1={C.x}
                y1={C.y}
                x2={Q_star.x}
                y2={Q_star.y}
                className="stroke-red-500"
                strokeWidth="3"
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Points and Labels */}
        <g className="fill-slate-800 text-lg font-serif italic">
          <circle cx={A.x} cy={A.y} r="4" />
          <text x={A.x - 5} y={A.y - 15}>
            A
          </text>

          <circle cx={B.x} cy={B.y} r="4" />
          <text x={B.x - 20} y={B.y + 20}>
            B
          </text>

          <circle cx={C.x} cy={C.y} r="4" />
          <text x={C.x + 10} y={C.y + 20}>
            C
          </text>

          <AnimatePresence>
            {step <= 2 && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <circle cx={P.x} cy={P.y} r="4" />
                <text x={P.x + 10} y={P.y - 5}>
                  P
                </text>

                <circle cx={Q.x} cy={Q.y} r="4" />
                <text x={Q.x - 25} y={Q.y - 5}>
                  Q
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 1 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <circle
                  cx={A_prime.x}
                  cy={A_prime.y}
                  r="4"
                  className="fill-slate-500"
                />
                <text
                  x={A_prime.x - 25}
                  y={A_prime.y + 20}
                  className="fill-slate-500"
                >
                  A'
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 3 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <circle
                  cx={C_prime.x}
                  cy={C_prime.y}
                  r="4"
                  className="fill-emerald-600"
                />
                <text
                  x={C_prime.x - 25}
                  y={C_prime.y - 10}
                  className="fill-emerald-600"
                >
                  C'
                </text>

                <circle
                  cx={Q_star.x}
                  cy={Q_star.y}
                  r="4"
                  className="fill-red-600"
                />
                <text
                  x={Q_star.x + 15}
                  y={Q_star.y - 10}
                  className="fill-red-600"
                >
                  Q*
                </text>
              </motion.g>
            )}
          </AnimatePresence>
        </g>
      </svg>
    </div>
  );
};
