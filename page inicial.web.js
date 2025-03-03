import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function PortfolioQA() {
  const [bugsFound, setBugsFound] = useState(0);
  const [scanActive, setScanActive] = useState(false);
  const [showBug, setShowBug] = useState(false);
  const [bugPosition, setBugPosition] = useState({ top: "50%", left: "50%" });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScanActive(true);
      setTimeout(() => {
        setScanActive(false);
        setShowBug(true);
        setBugPosition({
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
        });
        setTimeout(() => setShowBug(false), 3000);
      }, 1500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleBugClick = () => {
    setShowBug(false);
    setBugsFound((prev) => prev + 1);
    const screamSound = new Audio("/public/scream.mp3");
    screamSound.play();
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6 font-mono overflow-hidden">
      {/* Scanner Animation */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent ${scanActive ? "animate-scan" : "opacity-0"}`}
      ></div>

      {/* Bug Hidden Animation */}
      {showBug && (
        <motion.img
          src="/bug.png"
          alt="Hidden Bug"
          className="absolute w-16 h-16 cursor-pointer"
          style={{ top: bugPosition.top, left: bugPosition.left }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleBugClick}
        />
      )}

      {/* Foto de perfil com animação */}
      <motion.img
        src="/profile.jpg"
        alt="Esther Gabrielle"
        className="w-48 h-48 rounded-full shadow-2xl border-4 border-cyan-500 mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Nome e título */}
      <motion.h1 className="text-4xl font-extrabold text-cyan-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        Esther Gabrielle
      </motion.h1>
      <motion.p className="text-lg text-gray-300 mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        QA Engineer | Test Automation | Manual Testing
      </motion.p>

      {/* Botões de categorias de testes com animação */}
      <motion.div className="mt-8 grid grid-cols-2 gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <Button className="bg-cyan-500 hover:bg-cyan-600 shadow-lg border border-cyan-300">Automação</Button>
        <Button className="bg-blue-500 hover:bg-blue-600 shadow-lg border border-blue-300">Manual</Button>
        <Button className="bg-purple-500 hover:bg-purple-600 shadow-lg border border-purple-300">Funcional</Button>
        <Button className="bg-red-500 hover:bg-red-600 shadow-lg border border-red-300">Performance</Button>
      </motion.div>

      {/* Links para perfis com hover elegante */}
      <motion.div className="mt-8 flex space-x-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <a href="https://github.com/seuusuario" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
          <FaGithub className="text-4xl text-cyan-300 hover:text-white" />
        </a>
        <a href="https://linkedin.com/in/seuusuario" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
          <FaLinkedin className="text-4xl text-cyan-300 hover:text-white" />
        </a>
        <a href="mailto:seuemail@email.com" className="transition-transform transform hover:scale-110">
          <FaEnvelope className="text-4xl text-cyan-300 hover:text-white" />
        </a>
      </motion.div>

      {/* Botão para seção de projetos */}
      <motion.div className="mt-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
        <Button className="bg-yellow-500 hover:bg-yellow-600 shadow-lg border border-yellow-300" onClick={() => document.getElementById("projetos").scrollIntoView({ behavior: "smooth" })}>
          Ver Projetos
        </Button>
      </motion.div>

      {/* Contador de bugs encontrados */}
      <p className="mt-6 text-gray-300 text-lg">Bugs eliminados: {bugsFound}</p>
    </div>
  );
}
