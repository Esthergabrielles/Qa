"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bug, Github, Linkedin, Mail, Shield } from "lucide-react";

export default function QAPortfolio() {
  const initialBugs = [
    { id: 1, found: false, position: { top: "30%", left: "25%" } },
    { id: 2, found: false, position: { top: "55%", left: "65%" } },
    { id: 3, found: false, position: { top: "75%", left: "15%" } },
  ];

  const [bugs, setBugs] = useState(initialBugs);
  const [bugsFound, setBugsFound] = useState(0);
  const [ninjaPosition, setNinjaPosition] = useState({ top: "90%", left: "5%" });
  const [ninjaAction, setNinjaAction] = useState("idle");

  const nextBug = bugs.find((bug) => !bug.found);

  useEffect(() => {
    if (nextBug) {
      setTimeout(() => {
        setNinjaPosition(nextBug.position);
        setNinjaAction("walk");
      }, 1000);
    }
  }, [nextBug]);

  const handleBugClick = (bugId) => {
    setBugs((prev) =>
      prev.map((bug) => (bug.id === bugId ? { ...bug, found: true } : bug))
    );
    setBugsFound((prev) => prev + 1);
    setNinjaAction("kick");
    setTimeout(() => setNinjaAction("idle"), 500);
  };

  const restartGame = () => {
    setBugs(initialBugs);
    setBugsFound(0);
    setNinjaPosition({ top: "90%", left: "5%" });
    setNinjaAction("idle");
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8 overflow-hidden">
      {/* Bugs na tela */}
      {bugs.map((bug) =>
        !bug.found ? (
          <motion.div
            key={bug.id}
            className="absolute cursor-pointer"
            style={{ top: bug.position.top, left: bug.position.left }}
            whileHover={{ scale: 1.3 }}
            onClick={() => handleBugClick(bug.id)}
          >
            <Bug className="text-red-500 w-6 h-6 drop-shadow-lg" />
          </motion.div>
        ) : null
      )}

      {/* Ninja se movendo e atacando */}
      <motion.div
        className="absolute z-20"
        animate={ninjaPosition}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.div
          animate={ninjaAction}
          variants={{
            idle: { scale: 1 },
            walk: { x: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 0.5 } },
            kick: { rotate: [0, -20, 10, 0], transition: { duration: 0.5 } },
          }}
        >
          <Shield className="w-20 h-20 drop-shadow-xl text-green-400" />
        </motion.div>
      </motion.div>

      {/* Cartão de perfil */}
      <div className="relative z-10 flex flex-col items-center space-y-4 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <img
          src="https://placekitten.com/200/200"
          alt="Perfil"
          className="w-32 h-32 rounded-full border-4 border-green-500 shadow-2xl object-cover"
        />
        <h1 className="text-3xl font-extrabold">QA Bug Hunt</h1>
        <p className="text-lg text-gray-200">Encontre os bugs escondidos na tela!</p>
      </div>

      {/* Ícones sociais */}
      <div className="relative z-10 flex gap-6 my-4">
        <a href="https://github.com/seu-github" target="_blank">
          <Github className="w-8 h-8 transition-colors hover:text-gray-300" />
        </a>
        <a href="https://linkedin.com/in/seu-linkedin" target="_blank">
          <Linkedin className="w-8 h-8 transition-colors hover:text-gray-300" />
        </a>
        <a href="mailto:seu-email@email.com">
          <Mail className="w-8 h-8 transition-colors hover:text-gray-300" />
        </a>
      </div>

      {/* Informações do jogo */}
      <Card className="relative z-10 mt-4 p-6 text-center w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20">
        <CardContent>
          <p className="text-lg">
            Bugs encontrados: <span className="font-bold">{bugsFound}</span> / {bugs.length}
          </p>
          {bugsFound === bugs.length && (
            <p className="text-green-400 mt-2 font-semibold">Parabéns! Você encontrou todos os bugs!</p>
          )}
        </CardContent>
      </Card>

      {/* Botão para reiniciar */}
      <Button className="relative z-10 mt-6 hover:scale-105 transition-transform" onClick={restartGame}>
        Reiniciar
      </Button>
    </div>
  );
}
