import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, ZoomIn, X, ChevronLeft, ChevronRight, Check, HelpCircle, Map, Info } from "lucide-react";
import { VillaDetailSection } from "../types";

interface Slide4DetailProps {
  data: VillaDetailSection;
  onNavigate: (index: number) => void;
}

export default function Slide4Detail({ data, onNavigate }: Slide4DetailProps) {
  const [activeTab, setActiveTab] = useState<"amenities" | "specs" | "map" | "faq">("specs");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % data.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + data.images.length) % data.images.length);
    }
  };

  return (
    <section className="relative w-full min-h-screen py-20 px-6 md:px-12 lg:px-20 bg-brand-dominant overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Title and Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-blue font-sans font-semibold text-xs tracking-[0.25em] uppercase mb-3 block">
            03 / TRANG CHI TIẾT BIỆT THỰ
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-brand-navy tracking-tight font-bold mb-4">
            {data.target} Mũi Né
          </h2>
          <p className="text-brand-navy/70 font-sans font-light text-sm md:text-base leading-relaxed">
            {data.subtitle} • {data.price}
          </p>
        </div>

        {/* Video & Album Banner Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* S4 Video flycam section (Left 7 Columns) */}
          <div className="lg:col-span-7 relative bg-[#1A2B49] rounded-2xl overflow-hidden aspect-[16/10] shadow-organic border border-brand-navy/5 flex items-center justify-center">
            {showVideo ? (
              <div className="absolute inset-0 bg-brand-navy flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,92,150,0.4),rgba(26,43,73,0.95))]" />
                
                {/* Simulated ambient drone footage overlay */}
                <div className="relative z-10 flex flex-col items-center max-w-md">
                  <div className="w-16 h-16 rounded-full border-2 border-brand-gold flex items-center justify-center mb-6 animate-pulse">
                    <span className="text-brand-gold font-sans font-bold text-xs tracking-widest uppercase">LIVE</span>
                  </div>
                  <h4 className="font-serif text-2xl mb-2 font-semibold">Video Flycam Santoni 3</h4>
                  <p className="font-sans text-xs text-white/75 leading-relaxed mb-6">
                    Bản hòa tấu hoàng hôn từ flycam toàn cảnh 8 phòng ngủ, hồ bơi tràn biển, rặng dừa thơ mộng và sóng biển rì rào vỗ bờ cát trắng.
                  </p>
                  <button
                    onClick={() => setShowVideo(false)}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans text-xs px-6 py-2.5 rounded-full transition"
                  >
                    Đóng Video
                  </button>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={data.bannerImage}
                  alt="Santoni 3 Flycam Cover"
                  className="absolute inset-0 w-full h-full object-cover opacity-85"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 to-transparent" />
                
                {/* Central Play Button */}
                <button
                  onClick={() => setShowVideo(true)}
                  className="relative z-10 w-20 h-20 md:w-24 md:h-24 bg-white/95 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-brand-blue hover:text-brand-gold hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-brand-navy/5 group"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1 group-hover:rotate-12 transition-transform duration-300" />
                  {/* Outer Ripple */}
                  <div className="absolute -inset-4 rounded-full border border-white/30 animate-ping opacity-60 pointer-events-none" />
                </button>

                <div className="absolute bottom-6 left-6 text-white z-10">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-brand-gold font-semibold mb-1 block">Flycam Showcase</span>
                  <h4 className="font-serif text-lg md:text-xl font-bold">Xem thước phim toàn cảnh biệt thự</h4>
                </div>
              </>
            )}
          </div>

          {/* S4 Mosaic Photo Gallery (Right 5 Columns) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {data.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="mosaic-item cursor-pointer h-full min-h-[140px] md:min-h-[160px] relative group"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-brand-navy/40 transition-colors duration-300" />
                
                {/* Interactive indicator on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-md text-brand-blue scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                
                <span className="absolute bottom-3 left-3 right-3 text-white font-sans text-[10px] leading-tight truncate font-light z-10 bg-brand-navy/40 px-2 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.caption}
                </span>
              </div>
            ))}

            {/* Simulated Additional Photo Counter */}
            <div
              onClick={() => setLightboxIndex(0)}
              className="col-span-2 bg-brand-blue/5 hover:bg-brand-blue/10 border border-brand-blue/10 hover:border-brand-blue/20 rounded-xl p-4 flex items-center justify-between cursor-pointer transition text-brand-blue"
            >
              <span className="font-sans text-xs font-semibold uppercase tracking-wider">Xem album 40 ảnh chi tiết biệt thự</span>
              <span className="text-sm font-serif font-bold">40+ Photos →</span>
            </div>
          </div>
        </div>

        {/* Tab-based interactive layout specs / amenities / FAQ */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-brand-navy/5 shadow-organic p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-brand-navy/10 pb-6 mb-8">
            <button
              onClick={() => setActiveTab("specs")}
              className={`px-5 py-2.5 rounded-full font-sans text-xs md:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                activeTab === "specs"
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-brand-navy/5 text-brand-navy/70 hover:bg-brand-navy/10"
              }`}
            >
              🏡 Sơ Đồ & Thông Số
            </button>
            <button
              onClick={() => setActiveTab("amenities")}
              className={`px-5 py-2.5 rounded-full font-sans text-xs md:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                activeTab === "amenities"
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-brand-navy/5 text-brand-navy/70 hover:bg-brand-navy/10"
              }`}
            >
              ⭐ Tiện Ích Đẳng Cấp
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`px-5 py-2.5 rounded-full font-sans text-xs md:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                activeTab === "map"
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-brand-navy/5 text-brand-navy/70 hover:bg-brand-navy/10"
              }`}
            >
              🗺️ Sơ Đồ Mặt Bằng
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-5 py-2.5 rounded-full font-sans text-xs md:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                activeTab === "faq"
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-brand-navy/5 text-brand-navy/70 hover:bg-brand-navy/10"
              }`}
            >
              ❓ FAQ Giải Đáp
            </button>
          </div>

          <div className="min-h-[250px]">
            {/* Tab 1: Specs */}
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in">
                <div className="space-y-4">
                  <h4 className="font-serif text-xl font-bold text-brand-navy">Cơ Cấu Phòng & Diện Tích</h4>
                  <ul className="space-y-3 font-sans text-sm text-brand-navy/80">
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-brand-blue" />
                      </div>
                      <span><strong>Hạng phòng:</strong> {data.specs.rooms}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-brand-blue" />
                      </div>
                      <span><strong>Giường đệm:</strong> {data.specs.beds}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-brand-blue" />
                      </div>
                      <span><strong>Sức chứa tối đa:</strong> {data.specs.capacity}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-brand-blue" />
                      </div>
                      <span><strong>Diện tích khuôn viên:</strong> {data.specs.size}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-brand-blue" />
                      </div>
                      <span><strong>Không gian khách:</strong> {data.specs.living}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-brand-blue" />
                      </div>
                      <span><strong>Nhà bếp gia đình:</strong> {data.specs.kitchen}</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-brand-blue/5 p-6 rounded-xl border border-brand-blue/10">
                  <div className="flex items-center gap-2 text-brand-blue font-semibold mb-3">
                    <Info className="w-5 h-5" />
                    <span className="font-sans text-sm uppercase tracking-wide">Lý tưởng nhất cho</span>
                  </div>
                  <p className="font-sans text-sm text-brand-navy/80 leading-relaxed mb-4">
                    Biệt thự Santoni 3 được đông đảo các cơ quan tổ chức đại hội gia đình, đoàn họp lớp cấp ba, các đoàn du lịch kết hợp tổ chức đám cưới bãi biển tin tưởng chọn lựa nhờ mặt sàn sinh hoạt rộng mở và hồ bơi ngoài trời siêu đẹp.
                  </p>
                  <button
                    onClick={() => onNavigate(8)}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-sans font-medium text-xs py-3 rounded-lg transition"
                  >
                    Xem phòng trống & đặt ngay
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Amenities */}
            {activeTab === "amenities" && (
              <div className="animate-fade-in">
                <h4 className="font-serif text-xl font-bold text-brand-navy mb-6">Trang Bị Tiện Nghi Độc Quyền</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-brand-navy/5 rounded-xl border border-brand-navy/5">
                      <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5 text-brand-gold" />
                      </div>
                      <span className="font-sans text-sm text-brand-navy/90 leading-snug">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Map Layout */}
            {activeTab === "map" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in">
                <div className="space-y-4">
                  <h4 className="font-serif text-xl font-bold text-brand-navy">Sơ Đồ Phân Phối Mặt Bằng</h4>
                  <p className="font-sans text-sm text-brand-navy/80 leading-relaxed">
                    Santoni 3 được quy hoạch thành 2 tầng vòm đối xứng hướng trực tiếp biển:
                  </p>
                  <div className="space-y-3 font-sans text-sm">
                    <div className="p-3.5 bg-white rounded-lg border border-brand-navy/5 shadow-sm">
                      <span className="font-semibold text-brand-blue block mb-1">🔸 TẦNG TRỆT (Ground Floor)</span>
                      <span className="text-brand-navy/70 leading-relaxed block">
                        Phòng khách lớn đa năng, khu ăn uống ngoài trời, nhà bếp bếp đảo, 3 phòng ngủ khép kín (2 căn vòm đôi, 1 căn Master giường King), sảnh đón tiếp.
                      </span>
                    </div>
                    <div className="p-3.5 bg-white rounded-lg border border-brand-navy/5 shadow-sm">
                      <span className="font-semibold text-brand-blue block mb-1">🔸 TẦNG LẦU 1 (First Floor)</span>
                      <span className="text-brand-navy/70 leading-relaxed block">
                        5 phòng ngủ sang trọng khép kín, ban công ngắm biển chạy dọc, khu phòng tắm có bồn vòm cong kính lãng mạn, sân thượng BBQ ngoài trời.
                      </span>
                    </div>
                  </div>
                </div>
                {/* Architectural blueprint representation */}
                <div className="relative aspect-video bg-brand-navy/5 rounded-xl border border-brand-navy/10 flex flex-col items-center justify-center p-6 text-center text-brand-navy/50">
                  <Map className="w-12 h-12 mb-3 text-brand-blue/40" />
                  <span className="font-serif text-lg font-bold text-brand-navy mb-1">Bản Vẽ Kiến Trúc Vòm</span>
                  <p className="font-sans text-xs max-w-xs leading-relaxed">
                    Sơ đồ mặt bằng chi tiết của Santoni 3 được thiết kế bởi KTS Địa Trung Hải, bảo đảm đón gió tự nhiên 24/7.
                  </p>
                  <div className="absolute top-4 right-4 bg-brand-blue/10 px-2.5 py-1 rounded text-[10px] text-brand-blue tracking-widest uppercase font-semibold font-sans">
                    CAD Drawing
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: FAQ */}
            {activeTab === "faq" && (
              <div className="space-y-3 animate-fade-in">
                <h4 className="font-serif text-xl font-bold text-brand-navy mb-4">Các Câu Hỏi Thường Gặp</h4>
                {data.faq.map((item, idx) => {
                  const isOpen = expandedFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-brand-navy/5 rounded-xl overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-4 bg-brand-navy/5 hover:bg-brand-navy/10 text-left cursor-pointer transition"
                      >
                        <span className="font-serif text-sm md:text-base font-semibold text-brand-navy flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
                          {item.q}
                        </span>
                        <ChevronRight className={`w-4 h-4 text-brand-blue transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="p-4 bg-white/70 font-sans text-sm text-brand-navy/80 leading-relaxed border-t border-brand-navy/5">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* S4 Full-screen Photo Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1A2B49]/95 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Close Bar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white/80 z-20">
              <span className="font-sans text-xs tracking-widest uppercase font-medium">
                Photo {lightboxIndex + 1} / {data.images.length} • {data.target}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 hover:bg-white/10 rounded-full transition text-white hover:text-brand-gold cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Interactive Carousel Slide */}
            <div className="relative w-full max-w-5xl aspect-[16/10] md:aspect-[16/9] flex items-center justify-center z-10">
              {/* Prev Button */}
              <button
                onClick={prevImage}
                className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white hover:text-brand-gold transition cursor-pointer z-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={data.images[lightboxIndex].url}
                alt="Santoni Detail"
                className="max-h-[80vh] max-w-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white hover:text-brand-gold transition cursor-pointer z-30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Box */}
            <div className="absolute bottom-6 left-6 right-6 text-center z-20">
              <p className="font-serif italic text-white text-base md:text-lg max-w-2xl mx-auto">
                &ldquo;{data.images[lightboxIndex].caption}&rdquo;
              </p>
              <p className="font-sans text-[10px] uppercase text-white/50 tracking-wider mt-2">
                Santoni Mũi Né Luxury Collection
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
