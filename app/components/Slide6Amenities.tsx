"use client";

import * as Icons from "lucide-react";
import { ServiceItem } from "../types";

interface Slide6AmenitiesProps {
  data: ServiceItem[];
}

export default function Slide6Amenities({ data }: Slide6AmenitiesProps) {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Waves": return <Icons.Waves className="w-8 h-8 text-brand-blue" />;
      case "Flame": return <Icons.Flame className="w-8 h-8 text-brand-blue" />;
      case "Utensils": return <Icons.Utensils className="w-8 h-8 text-brand-blue" />;
      case "Wifi": return <Icons.Wifi className="w-8 h-8 text-brand-blue" />;
      case "Car": return <Icons.Car className="w-8 h-8 text-brand-blue" />;
      case "Mic2": return <Icons.Mic2 className="w-8 h-8 text-brand-blue" />;
      default: return <Icons.Compass className="w-8 h-8 text-brand-blue" />;
    }
  };

  return (
    <section className="relative w-full min-h-screen py-20 px-6 md:px-12 lg:px-20 bg-brand-dominant flex flex-col justify-center overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-brand-navy/[0.02] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-brand-navy/[0.02] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-[80%] w-[1px] bg-brand-navy/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-blue font-sans font-semibold text-xs tracking-[0.25em] uppercase mb-3 block">05 / TIỆN ÍCH DỊCH VỤ</span>
          <h2 className="font-serif text-3xl md:text-5xl text-brand-navy tracking-tight font-bold mb-4">Đầy Đủ Tiện Nghi Đỉnh Cao</h2>
          <p className="text-brand-navy/60 font-sans font-light text-sm md:text-base leading-relaxed">
            Mỗi căn biệt thự trong hệ thống Santoni được trang bị đầy đủ tất cả dịch vụ bổ trợ sinh hoạt, mang đến trải nghiệm nghỉ dưỡng hoàn mỹ tựa ngôi nhà thứ hai.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, idx) => (
            <div key={idx} className="bento-card p-8 flex flex-col justify-between group cursor-default">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-brand-navy/5 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-brand-blue/10 group-hover:scale-110">
                  {renderIcon(item.icon)}
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-blue transition">
                  {item.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-brand-navy/70 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-brand-navy/5 flex items-center gap-1.5 text-[11px] text-brand-navy/40 font-sans font-semibold group-hover:text-brand-gold transition duration-300 uppercase tracking-widest">
                <span>Santoni Service</span>
                <span className="w-4 h-[1px] bg-brand-navy/20 group-hover:bg-brand-gold group-hover:w-8 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
