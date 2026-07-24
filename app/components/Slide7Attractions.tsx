"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Compass, Navigation } from "lucide-react";
import { AttractionItem } from "../types";

interface Slide7AttractionsProps {
  data: AttractionItem[];
}

export default function Slide7Attractions({ data }: Slide7AttractionsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen py-20 px-6 md:px-12 lg:px-20 bg-brand-dominant flex flex-col justify-center overflow-hidden">
      {/* Editorial Watermark */}
      <div className="absolute left-10 bottom-10 font-serif text-[12vw] text-brand-navy/[0.015] select-none pointer-events-none uppercase leading-none font-bold">
        Mui Ne
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Title Group with Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-brand-blue font-sans font-semibold text-xs tracking-[0.25em] uppercase mb-3 block">
              06 / ĐIỂM ĐẾN KHU VỰC LÂN CẬN
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-brand-navy tracking-tight font-bold">
              Bản Đồ Du Lịch Mũi Né
            </h2>
            <p className="text-brand-navy/60 font-sans font-light text-sm md:text-base mt-2 max-w-xl">
              Hệ thống Santoni nằm ở vị trí trung tâm du lịch sầm uất, giúp quý khách dễ dàng di chuyển nhanh đến 7 kỳ quan thiên nhiên đặc sắc nhất Phan Thiết.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              id="attractions-scroll-left"
              onClick={scrollLeft}
              className="p-3 bg-white hover:bg-brand-blue hover:text-white rounded-full border border-brand-navy/10 hover:border-brand-blue shadow-sm transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="attractions-scroll-right"
              onClick={scrollRight}
              className="p-3 bg-white hover:bg-brand-blue hover:text-white rounded-full border border-brand-navy/10 hover:border-brand-blue shadow-sm transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x scroll-smooth -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20"
          style={{ scrollbarWidth: "none" }}
        >
          {data.map((item, idx) => (
            <div
              key={idx}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-white rounded-2xl border border-brand-navy/5 shadow-organic overflow-hidden group flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-organic-hover hover:border-brand-gold/30"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 to-transparent" />
                <div className="absolute top-4 left-4 bg-brand-blue/90 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-[10px] font-sans font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-brand-gold fill-current" />
                  {item.distance}
                </div>
              </div>

              {/* Copy */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-white/40">
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition">
                    {item.name}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-brand-navy/70 leading-relaxed font-light line-clamp-3">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-navy/5 flex items-center gap-2 text-[10px] font-sans tracking-widest text-brand-navy/50 group-hover:text-brand-blue transition">
                  <Compass className="w-3.5 h-3.5" />
                  <span>XEM HƯỚNG DẪN ĐƯỜNG ĐI</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <span className="font-sans text-[10px] tracking-widest text-brand-navy/40 uppercase">
            Vuốt ngang để xem thêm địa điểm • Click mũi tên để cuộn nhanh
          </span>
        </div>
      </div>
    </section>
  );
}
