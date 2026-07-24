"use client";

import { motion } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { HeroSection, BrandInfo } from "../types";
import { getAssetUrl } from "../utils/image";

interface Slide1HeroProps {
  data: HeroSection;
  brand: BrandInfo;
  onNavigate: (index: number) => void;
  onOpenQuote: () => void;
}

export default function Slide1Hero({ data, brand, onNavigate, onOpenQuote }: Slide1HeroProps) {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background Image with Ken Burns zoom effect */}
      <div className="absolute inset-0 z-0">
        <img
          src={getAssetUrl(data.backgroundImage)}
          alt="Santoni Mũi Né Hero Background"
          className="w-full h-full object-cover scale-105"
          style={{ animation: "subtle-zoom 20s infinite alternate" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2B49]/50 via-[#1A2B49]/40 to-[#1A2B49]/70" />
      </div>

      {/* Floating brand accent lines */}
      <div className="absolute top-1/4 left-10 w-16 h-[1px] bg-brand-gold/40 hidden md:block" />
      <div className="absolute top-1/4 right-10 w-16 h-[1px] bg-brand-gold/40 hidden md:block" />

      {/* Central content card */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Tagline with horizontal decorative gold divider lines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center gap-3 sm:gap-6 mb-6 md:mb-8 w-full max-w-4xl px-2"
        >
          <div className="flex-1 h-[1px] bg-brand-gold/40 min-w-[30px]" />
          <span className="text-brand-gold font-sans tracking-[0.15em] sm:tracking-[0.25em] text-[10px] sm:text-xs uppercase font-semibold text-center leading-normal">
            {brand.tagline}
          </span>
          <div className="flex-1 h-[1px] bg-brand-gold/40 min-w-[30px]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-tight mb-6 font-medium"
          style={{ fontFamily: "'Playfair Display', 'Times New Roman', Times, serif" }}
        >
          {data.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-white/90 text-sm md:text-lg max-w-2xl font-light leading-relaxed mb-10 md:mb-12 font-sans px-4 text-center"
        >
          {data.subtitle}
        </motion.p>

        {/* 3 Call-To-Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4"
        >
          <button
            id="hero-book-btn"
            onClick={() => onNavigate(8)}
            className="w-full sm:w-auto bg-[#0A5C96] hover:bg-[#084978] text-white font-sans font-semibold text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/20 hover:scale-105 active:scale-95 group cursor-pointer"
          >
            {data.cta.book}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            id="hero-explore-btn"
            onClick={() => onNavigate(2)}
            className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border border-white/40 backdrop-blur-md font-sans font-semibold text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {data.cta.explore}
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            id="hero-quote-btn"
            onClick={onOpenQuote}
            className="w-full sm:w-auto bg-transparent hover:bg-brand-gold/10 text-brand-gold border border-brand-gold/50 hover:border-brand-gold font-sans font-semibold text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {data.cta.quote}
          </button>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="text-white font-sans text-[10px] tracking-[0.2em] uppercase font-light">Cuộn xuống</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </section>
  );
}
