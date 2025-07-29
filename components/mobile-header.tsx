"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

interface MobileHeaderProps {
  scrollToSection: (sectionId: string) => void;
}

export function MobileHeader({ scrollToSection }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    setTimeout(() => scrollToSection(sectionId), 100);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-mcd-purple/20 shadow-lg"
        style={{ width: "100vw", maxWidth: "100vw" }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 py-3 w-full max-w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 min-w-0 flex-1 max-w-[70%]">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/Logo.png"
                  alt="MC&D Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-lg font-bold text-foreground truncate">
                MC&D Handbook
              </span>
            </div>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 rounded-lg bg-gradient-to-br from-muted/80 to-muted/60 hover:from-muted hover:to-muted/80 border border-muted-foreground/20 hover:border-mcd-purple/50 transition-all duration-300 ease-out shadow-lg group flex-shrink-0 max-w-[30%]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-muted-foreground group-hover:text-mcd-yellow transition-colors" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-muted-foreground group-hover:text-mcd-yellow transition-colors" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-mcd-purple/20 shadow-lg"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <nav className="p-4 space-y-2">
                  {[
                    { id: "verification", label: "Verification" },
                    { id: "codenames", label: "Codenames" },
                    { id: "self-deployments", label: "Self-Deployments and Points" },
                    { id: "morphs", label: "Morphs" },
                    { id: "hierarchy", label: "Hierarchy and Promotions" },
                    { id: "discord-channels", label: "Discord Channels Guide" },
                    { id: "divisions", label: "Divisions" },
                    { id: "final-steps", label: "Final Steps" },
                  ].map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="w-full text-left px-4 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-mcd-purple/20 transition-all duration-200"
                      whileHover={{ x: 10 }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  
                  {/* Theme Toggle for Mobile */}
                  <motion.div
                    className="flex items-center justify-center pt-4 border-t border-mcd-purple/20 mt-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <ThemeToggle />
                  </motion.div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}