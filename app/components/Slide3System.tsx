"use client";

import { Bed, Users, Waves, MapPin, ArrowUpRight } from "lucide-react";
import { AccommodationCard } from "../types";

interface Slide3SystemProps {
  data: AccommodationCard[];
  onSelectVilla: (id: string) => void;
  onNavigate: (index: number) => void;
}

export default function Slide3System({ data, onSelectVilla, onNavigate }: Slide3SystemProps) {
  const getGridClasses = (id: string) => {
    switch (id) {
      case "santoni-1": return "md:col-span-4 lg:col-span-3 h-full";
      case "santoni-2": return "md:col-span-4 lg:col-span-3 h-full";
      case "santoni-3": return "md:col-span-8 lg:col-span-6 h-full";
      case "resort-santoni": return "md:col-span-12 lg:col-span-12 h-full";
      default: return "md:col-span-6 h-full";
    }
  };

  return (
    <section className="relative w-full min-h-screen py-20 px-6 md:px-12 lg:px-20 flex flex-col justify-center bg-brand-dominant overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-brand-blue font-sans font-semibold text-xs tracking-[0.25em] uppercase mb-3 block">
              02 / HỆ THỐNG LƯU TRÚ
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-brand-navy tracking-tight font-bold">
              Khám Phá Các Căn Santoni
            </h2>
          </div>
          <p className="text-brand-navy/60 font-sans font-light text-sm md:text-base max-w-md mt-4 md:mt-0 leading-relaxed">
            Chúng tôi thiết kế các không gian từ ấm cúng, tinh gọn đến các căn siêu biệt thự và khu phức hợp nghỉ dưỡng đẳng cấp cho đoàn lớn.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {data.map((item) => {
            const isFeatured = item.id === "santoni-3";

            return (
              <div
                key={item.id}
                id={`villa-card-${item.id}`}
                onClick={() => {
                  onSelectVilla(item.id);
                  if (item.id === "santoni-3") {
                    onNavigate(3);
                  } else {
                    onNavigate(8);
                  }
                }}
                className={`group bento-card cursor-pointer flex flex-col justify-between overflow-hidden relative ${getGridClasses(item.id)}`}
              >
                {/* Image Section */}
                <div className={`relative overflow-hidden w-full ${item.id === "resort-santoni" ? "h-64 md:h-80" : "h-56 md:h-64"}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-80" />

                  {/* Price badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-brand-navy/5">
                    <span className="font-sans text-[10px] text-brand-navy/60 uppercase tracking-widest block leading-none">Chỉ từ</span>
                    <span className="font-serif text-sm font-bold text-brand-blue leading-none mt-1 block">{item.priceFrom}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 text-white z-10">
                    <h3 className="font-serif text-xl md:text-2xl font-bold flex items-center gap-1.5 leading-none">
                      {item.name}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="w-5 h-5 text-brand-gold" />
                      </span>
                    </h3>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white/45">
                  <p className="text-brand-navy/70 text-xs md:text-sm font-light leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-brand-navy/5 text-xs">
                    <div className="flex items-center gap-2 text-brand-navy/80">
                      <Bed className="w-4 h-4 text-brand-blue shrink-0" />
                      <span>{item.rooms} phòng ngủ</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-navy/80">
                      <Users className="w-4 h-4 text-brand-blue shrink-0" />
                      <span>{item.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-navy/80">
                      <Waves className="w-4 h-4 text-brand-blue shrink-0" />
                      <span className="truncate">{item.pool}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-navy/80 col-span-2 md:col-span-1">
                      <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                      <span>{item.beachDistance}</span>
                    </div>
                  </div>

                  {isFeatured && (
                    <div className="mt-4 bg-brand-gold/10 border border-brand-gold/30 rounded-lg py-2 px-3 flex items-center justify-between text-xs text-brand-navy">
                      <span className="font-medium">✨ Căn hộ nổi bật nhất - Xem ngay album 40+ ảnh</span>
                      <span className="text-brand-blue hover:underline font-semibold font-sans">Chi tiết →</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
