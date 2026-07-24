"use client";

import { CheckCircle, Calendar, ShieldAlert, BadgeInfo } from "lucide-react";
import { PricingSection } from "../types";

interface Slide5PricingProps {
  data: PricingSection;
  onNavigate: (index: number) => void;
}

export default function Slide5Pricing({ data, onNavigate }: Slide5PricingProps) {
  return (
    <section className="relative w-full min-h-screen py-20 px-6 md:px-12 lg:px-20 bg-brand-dominant flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

        {/* Left Side: Cover banner */}
        <div className="lg:col-span-4 relative rounded-2xl overflow-hidden min-h-[300px] lg:min-h-full shadow-organic border border-brand-navy/5 flex flex-col justify-between p-8 group">
          <img
            src="/image-villa3.jpg"
            alt="Santoni Mũi Né Pricing Banner"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/40 to-[#1A2B49]/90" />

          <div className="relative z-10 self-start bg-brand-gold text-brand-navy font-sans font-bold text-[9px] tracking-widest uppercase px-3 py-1 rounded-full">
            BẢNG GIÁ NIÊM YẾT 2026
          </div>

          <div className="relative z-10 text-white">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 block">04 / BIỂU GIÁ THƯƠNG HIỆU</span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3 tracking-tight">Kỳ Nghỉ Trọn Vẹn Đang Chờ Bạn</h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed font-light mb-6">
              Đặt trực tiếp qua website hôm nay để nhận ngay voucher giảm 10% cho các dịch vụ ăn uống và setup hải sản ngoài bãi biển.
            </p>
            <button
              id="pricing-contact-btn"
              onClick={() => onNavigate(8)}
              className="bg-white text-brand-blue hover:bg-brand-gold hover:text-brand-navy font-sans font-medium text-xs px-6 py-3 rounded-full transition-all duration-300 w-full cursor-pointer"
            >
              Liên hệ nhận ưu đãi ngay
            </button>
          </div>
        </div>

        {/* Right Side: Detailed prices */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <span className="text-brand-blue font-sans font-semibold text-xs tracking-[0.25em] uppercase mb-3 block">CÔNG KHAI & MINH BẠCH</span>
            <h2 className="font-serif text-3xl md:text-5xl text-brand-navy tracking-tight font-bold mb-3">{data.title}</h2>
            <p className="text-brand-navy/60 font-sans font-light text-sm md:text-base leading-relaxed mb-8 max-w-2xl">{data.subtitle}</p>
          </div>

          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
            {data.categories.map((category, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl border border-brand-navy/5 p-6 shadow-sm hover:border-brand-blue/25 transition duration-300">
                <div className="flex items-center gap-2 text-brand-blue font-serif text-base md:text-lg font-bold mb-4">
                  <Calendar className="w-5 h-5" />
                  {category.name}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse font-sans text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-brand-navy/10 text-brand-navy/50 uppercase tracking-wider text-[10px]">
                        <th className="pb-3 font-medium">Hạng Biệt Thự</th>
                        <th className="pb-3 font-medium text-right">Đơn Giá / Đêm</th>
                        <th className="pb-3 font-medium text-right">Mức Ưu Đãi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-navy/5">
                      {category.rates.map((rate, rIdx) => (
                        <tr key={rIdx} className="hover:bg-brand-navy/[0.01] transition">
                          <td className="py-3 font-medium text-brand-navy">{rate.villa}</td>
                          <td className="py-3 text-right font-serif font-semibold text-brand-blue">{rate.price}</td>
                          <td className="py-3 text-right text-brand-gold font-medium">Giảm 5% khi ở 2+ đêm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Policies */}
            <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-xl p-6">
              <div className="flex items-center gap-2 text-brand-navy font-serif text-base md:text-lg font-bold mb-4">
                <ShieldAlert className="w-5 h-5 text-brand-gold" />
                Chính Sách & Nội Quy Cần Biết
              </div>
              <ul className="space-y-3 font-sans text-xs md:text-sm text-brand-navy/80">
                {data.policies.map((policy, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                    <span>{policy}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-brand-gold/10 flex items-center gap-2 text-[11px] text-brand-navy/60 font-sans">
                <BadgeInfo className="w-4 h-4 text-brand-blue" />
                Quý khách vui lòng mang theo Giấy tờ tùy thân (CCCD/Passport) để làm thủ tục khai báo lưu trú tạm thời khi nhận phòng.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
