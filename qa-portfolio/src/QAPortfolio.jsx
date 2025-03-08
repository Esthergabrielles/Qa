"use client"; // Se for Next.js, necessário para hooks funcionarem

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bug, Github, Linkedin, Mail, Shield } from "lucide-react";

export default function QAPortfolio() {
  const [bugsFound, setBugsFound] = useState(0);
  const [bugs, setBugs] = useState([
    { id: 1, found: false, position: { top: "25%", left: "35%" } },
    { id: 2, found: false, position: { top: "50%", left: "65%" } }, // Bug alvo
    { id: 3, found: false, position: { top: "70%", left: "20%" } },
  ]);

  const [ninjaAction, setNinjaAction] = useState("walk");
  const [ninjaPosition, setNinjaPosition] = useState({ top: "90%", left: "0%" });

  const targetBug = bugs.find((b) => b.id === 2 && !b.found);

  useEffect(() => {
    if (targetBug) {
      const timer = setTimeout(() => {
        setNinjaPosition(targetBug.position);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [targetBug]);

  const handleWalkComplete = () => {
    if (ninjaAction === "walk") setNinjaAction("kick");
  };

  const handleKickComplete = () => {
    if (ninjaAction === "kick" && targetBug) {
      setBugs((prev) =>
        prev.map((bug) =>
          bug.id === targetBug.id ? { ...bug, found: true } : bug
        )
      );
      setBugsFound((prev) => prev + 1);
    }
  };

  const ninjaVariants = {
    walk: {
      x: [0, 5, -5, 0],
      transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
    },
    kick: {
      rotate: [0, -20, 10, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 via-blue-800 to-indigo-900 text-white p-8 overflow-hidden">
      {/* Bugs na tela */}
      <div className="absolute inset-0">
        {bugs.map((bug) =>
          !bug.found ? (
            <motion.div
              key={bug.id}
              className="absolute cursor-pointer"
              style={{ top: bug.position.top, left: bug.position.left }}
              whileHover={{ scale: 1.3 }}
              onClick={() => {
                setBugs((prev) =>
                  prev.map((b) => (b.id === bug.id ? { ...b, found: true } : b))
                );
                setBugsFound((prev) => prev + 1);
              }}
            >
              <Bug className="text-red-500 w-6 h-6 drop-shadow-lg" />
            </motion.div>
          ) : null
        )}
      </div>

      {/* Ninja (ícone Shield) se movendo e chutando */}
      <motion.div
        className="absolute z-20"
        animate={ninjaPosition}
        transition={{ duration: 2, ease: "easeInOut" }}
        onAnimationComplete={handleWalkComplete}
      >
        <motion.div
          initial="walk"
          animate={ninjaAction}
          variants={ninjaVariants}
          onAnimationComplete={handleKickComplete}
        >
          <Shield className="w-20 h-20 drop-shadow-xl" />
        </motion.div>
      </motion.div>

      {/* Cartão de perfil */}
      <div className="relative z-10 flex flex-col items-center space-y-4 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <img
          src="https://placekitten.com/200/200"
          alt="Perfil"
          className="w-32 h-32 rounded-full border-4 border-green-500 shadow-2xl object-cover"
        />
        <h1 className="text-4xl font-extrabold tracking-tight">QA Bug Hunt</h1>
        <p className="text-lg text-gray-200">
          Encontre os bugs escondidos na tela e explore meus testes!
        </p>
      </div>

      {/* Ícones sociais */}
      <div className="relative z-10 flex gap-6 my-4">
        <a href="https://github.com/seu-github" target="_blank">
          <Github className="w-8 h-8 transition-colors hover:text-gray-300" />
        </a>
        <a href="https://linkedin.com/in/seu-linkedin" target="_blank">
          <Linkedin className="w-8 h-8 transition-colors hover:text-gray-300" />
        </a>
        <a href="mailto:s
