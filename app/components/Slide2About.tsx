"use client";

import { AboutSection } from "../types";
import { getAssetUrl } from "../utils/image";

interface Slide2AboutProps {
  data: AboutSection;
}

export default function Slide2About({ data }: Slide2AboutProps) {
  return (
    <section className="relative w-full min-h-screen py-20 px-6 md:px-12 lg:px-20 flex flex-col justify-center overflow-hidden bg-brand-dominant">
      {/* Editorial Decorative Background Label */}
      <div className="absolute right-10 top-10 font-serif text-[12vw] text-brand-navy/[0.02] select-none pointer-events-none uppercase leading-none font-bold">
        Santoni
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Editorial narrative content */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10">
          <span className="text-brand-blue font-sans font-semibold text-xs tracking-[0.25em] uppercase mb-3">
            01 / THƯƠNG HIỆU ĐẲNG CẤP
          </span>

          <h2 className="font-serif text-3xl md:text-5xl text-[#3260b4] tracking-tight mb-4 font-bold">
            {data.title}
          </h2>

          <p className="font-sans text-brand-gold text-lg font-medium tracking-wide mb-8 max-w-2xl">
            {data.subtitle}
          </p>

          <div className="space-y-5 text-brand-navy/80 font-sans text-sm md:text-base font-light leading-relaxed max-w-2xl">
            {data.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-brand-navy/10">
            {data.highlights.map((hl, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-brand-navy/50 font-sans text-xs uppercase tracking-wider mb-1">
                  {hl.label}
                </span>
                <span className="text-brand-blue font-serif text-lg md:text-xl font-bold">
                  {hl.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Showcase Image */}
        <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end z-0">
          {/* Subtle gold glow card frame */}
          <div className="absolute -inset-1 rounded-[18px] bg-gradient-to-tr from-brand-gold/15 to-transparent blur-lg opacity-80" />

          {/* Main image container */}
          <div className="relative overflow-hidden rounded-2xl shadow-organic border border-brand-navy/5 max-w-md lg:max-w-full w-full aspect-[4/5] group">
            <img
              src={getAssetUrl(data.image)}
              alt="Santoni Mũi Né Architecture"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-6 left-6 text-white z-10">
              <p className="font-serif italic text-lg font-light">Santoni Mũi Né Exterior</p>
              <p className="font-sans text-[10px] tracking-widest uppercase text-white/70 mt-1">
                Mediterranean Architecture
              </p>
            </div>
          </div>

          {/* Floating artistic quote block */}
          <div className="absolute -bottom-6 -left-6 md:-left-10 bg-white p-6 rounded-xl shadow-organic border border-brand-navy/5 max-w-xs hidden sm:block">
            <p className="font-serif italic text-brand-navy text-sm font-light leading-relaxed">
              &ldquo;Không đơn thuần là một kỳ nghỉ, đó là hành trình chạm tới tinh hoa văn hóa Địa Trung Hải rực rỡ.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
