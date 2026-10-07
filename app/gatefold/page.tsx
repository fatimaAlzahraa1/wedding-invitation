"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function GatefoldPage() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="gatefold-page">
      <div
        className="gatefold"
        onClick={() => setOpened(true)}
        role="button"
        tabIndex={0}
        aria-label="Open wedding invitation"
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            setOpened(true);
          }
        }}
      >
        {/* الدعوة الموجودة خلف الظرف */}
        <div className="gatefold-invitation">
          <div className="gatefold-invitation-content">
            <p>The Wedding of</p>
            <h1>Mohamed Atef &amp; Nada El-Morsy</h1>
          </div>
        </div>

        {/* الباب الشمال */}
        <motion.div
          className="gatefold-door gatefold-left"
          animate={{
            rotateY: opened ? -110 : 0,
          }}
          transition={{
            duration: 1.2,
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          <div className="gatefold-panel">
            <span>Mohamed</span>
          </div>
        </motion.div>

        {/* الباب اليمين */}
        <motion.div
          className="gatefold-door gatefold-right"
          animate={{
            rotateY: opened ? 110 : 0,
          }}
          transition={{
            duration: 1.2,
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          <div className="gatefold-panel">
            <span>Nada</span>
          </div>
        </motion.div>

        {/* الختم */}
        <motion.div
          className="gatefold-seal"
          animate={{
            opacity: opened ? 0 : 1,
            scale: opened ? 0.6 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          ♥
        </motion.div>
      </div>
    </main>
  );
}

