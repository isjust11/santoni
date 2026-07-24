import { useState } from "react";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogItem } from "../types";

interface Slide8BlogProps {
  data: BlogItem[];
}

export default function Slide8Blog({ data }: Slide8BlogProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const featured = data[selectedIndex] || data[0];

  return (
    <section className="relative w-full min-h-screen py-20 px-6 md:px-12 lg:px-20 bg-brand-dominant flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Side: Article List Selector (7 columns) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <span className="text-brand-blue font-sans font-semibold text-xs tracking-[0.25em] uppercase mb-3 block">
              07 / GÓC CHIA SẺ & SEO BLOG
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-brand-navy tracking-tight font-bold mb-4">
              Cẩm Nang Du Lịch Mũi Né
            </h2>
            <p className="text-brand-navy/60 font-sans font-light text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              Cập nhật liên tục những cẩm nang bổ ích, kinh nghiệm vui chơi bãi biển, các góc check-in sống ảo cực đẹp và tin tức khuyến mãi mới nhất từ Santoni.
            </p>
          </div>

          {/* Interactive list of articles */}
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {data.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex gap-4 items-center ${
                    isSelected
                      ? "bg-white border-brand-blue/30 shadow-md translate-x-2"
                      : "bg-white/40 border-brand-navy/5 hover:bg-white/70 hover:translate-x-1"
                  }`}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 text-[10px] text-brand-navy/50 font-sans mb-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-brand-blue" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-brand-blue" />
                        {item.readTime}
                      </span>
                    </div>
                    <h3 className="font-serif text-sm md:text-base font-bold text-brand-navy truncate leading-tight group-hover:text-brand-blue">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-brand-navy/60 line-clamp-1 font-light mt-1">
                      {item.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Large Featured Article Showcase (5 columns) */}
        <div className="lg:col-span-5 relative bg-white/70 backdrop-blur-md rounded-2xl border border-brand-navy/5 shadow-organic p-6 md:p-8 flex flex-col justify-between group">
          
          {/* Cover image area */}
          <div className="relative overflow-hidden rounded-xl aspect-video mb-6 shadow-sm">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent" />
            
            <div className="absolute top-4 left-4 bg-brand-gold text-brand-navy font-sans font-bold text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-md">
              TIÊU ĐIỂM BLOG
            </div>
          </div>

          {/* Copy Area */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-xs text-brand-navy/60 font-sans mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                  {featured.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-blue" />
                  {featured.readTime}
                </span>
              </div>

              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-navy mb-4 leading-tight">
                {featured.title}
              </h3>

              <p className="font-sans text-xs md:text-sm text-brand-navy/70 leading-relaxed font-light mb-6">
                {featured.summary}
              </p>
            </div>

            {/* Click to read detail */}
            <button
              onClick={() => alert(`Tính năng đọc bài viết "${featured.title}" đang được chuẩn bị!`)}
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-sans font-medium text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition duration-300 group-hover:shadow-lg group-hover:shadow-brand-blue/10 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Đọc toàn bộ bài viết
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
