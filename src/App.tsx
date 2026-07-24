import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Phone, MapPin, Menu, X, Sparkles, MessageSquare, Send, Calendar } from "lucide-react";

// Types & Data
import contentDataRaw from "./data/contentData.json";
import { ContentData } from "./types";

// Slide Components
import Slide1Hero from "./components/Slide1Hero";
import Slide2About from "./components/Slide2About";
import Slide3System from "./components/Slide3System";
import Slide4Detail from "./components/Slide4Detail";
import Slide5Pricing from "./components/Slide5Pricing";
import Slide6Amenities from "./components/Slide6Amenities";
import Slide7Attractions from "./components/Slide7Attractions";
import Slide8Blog from "./components/Slide8Blog";
import Slide9Contact from "./components/Slide9Contact";

const contentData = contentDataRaw as ContentData;

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedVillaId, setSelectedVillaId] = useState("santoni-3");

  // Quote form state
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    phone: "",
    guests: "15",
    dates: ""
  });
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  // DOM Refs
  const lineRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const sideNavRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: "Trang Chủ", index: 0 },
    { label: "Câu Chuyện", index: 1 },
    { label: "Hệ Thống", index: 2 },
    { label: "Santoni 3", index: 3 },
    { label: "Bảng Giá", index: 4 },
    { label: "Tiện Ích", index: 5 },
    { label: "Điểm Đến", index: 6 },
    { label: "Cẩm Nang", index: 7 },
    { label: "Liên Hệ", index: 8 }
  ];

  // GSAP scrollspy indicator line movement
  useEffect(() => {
    if (lineRef.current) {
      const totalSegments = menuItems.length;
      const segmentWidthPercent = 100 / totalSegments;
      gsap.to(lineRef.current, {
        left: `${activeIndex * segmentWidthPercent}%`,
        width: `${segmentWidthPercent}%`,
        duration: 0.55,
        ease: "power2.out"
      });
    }

    // Side nav floating indicator animation
    if (sideNavRef.current) {
      const dots = sideNavRef.current.querySelectorAll(".side-dot");
      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          gsap.to(dot, { scale: 1.4, backgroundColor: "#0A5C96", duration: 0.3 });
        } else {
          gsap.to(dot, {
            scale: 1,
            backgroundColor: activeIndex === 0 ? "rgba(255, 255, 255, 0.45)" : "rgba(26, 43, 73, 0.25)",
            duration: 0.3
          });
        }
      });
    }
  }, [activeIndex]);

  // GSAP initial load animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header slides down
      gsap.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      // Side indicators fade in
      gsap.fromTo(
        sideNavRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  // Intersection Observer for Scrollspy
  useEffect(() => {
    const sections = menuItems.map((item) => document.getElementById(`slide-section-${item.index}`));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idStr = entry.target.id;
            const idx = parseInt(idStr.split("slide-section-")[1], 10);
            if (!isNaN(idx)) {
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        threshold: 0.35, // Trigger when 35% of section is visible
        rootMargin: "-10% 0px -40% 0px"
      }
    );

    sections.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => {
      sections.forEach((sec) => {
        if (sec) observer.unobserve(sec);
      });
    };
  }, []);

  // Smooth scroll helper
  const navigateToSlide = (index: number) => {
    const target = document.getElementById(`slide-section-${index}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  // Open & Close Quote Modal animations
  const openQuoteModal = () => {
    setShowQuoteModal(true);
    setQuoteSuccess(false);
    setTimeout(() => {
      gsap.fromTo(
        "#quote-modal-card",
        { y: -60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }, 50);
  };

  const closeQuoteModal = () => {
    gsap.to("#quote-modal-card", {
      y: -40,
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => setShowQuoteModal(false)
    });
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.phone) {
      alert("Vui lòng nhập họ tên và số điện thoại!");
      return;
    }
    setQuoteSuccess(true);
  };

  return (
    <div className="relative min-h-screen bg-brand-dominant text-brand-navy selection:bg-brand-blue/15">

      {/* 1. Header (Sticky Navigation Bar with Glassmorphism) */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 glass-header h-20 flex items-center justify-between px-6 md:px-12 opacity-0"
      >
        {/* Brand Logo / Naming */}
        <div
          onClick={() => navigateToSlide(0)}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/10 group-hover:bg-brand-blue group-hover:text-white transition duration-300">
            <Sparkles className="w-5 h-5 fill-current text-brand-gold" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-brand-navy group-hover:text-brand-blue transition">
              {contentData.brand.name}
            </span>
            <span className="font-sans text-[9px] tracking-widest text-brand-navy/50 uppercase leading-none mt-0.5">
              HOME STAY & VILLA
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
          {menuItems.map((item) => (
            <button
              key={item.index}
              onClick={() => navigateToSlide(item.index)}
              className={`font-sans text-[11px] xl:text-xs font-semibold tracking-wider uppercase cursor-pointer transition h-full px-2 flex items-center border-b-2 border-transparent ${activeIndex === item.index
                  ? "text-brand-blue font-bold"
                  : "text-brand-navy/60 hover:text-brand-blue"
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA (Quick booking) */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${contentData.brand.hotline.replace(/[^0-9]/g, "")}`}
            className="font-sans text-xs font-bold text-brand-navy/80 hover:text-brand-blue transition flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-brand-blue shrink-0" />
            {contentData.brand.hotline}
          </a>
          <button
            onClick={openQuoteModal}
            className="bg-brand-blue hover:bg-brand-blue/90 text-white font-sans text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-md hover:shadow-brand-blue/10 cursor-pointer"
          >
            Nhận báo giá
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 lg:hidden rounded-lg hover:bg-brand-navy/5 text-brand-navy transition cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Sticky Blue Progress Line at Bottom of Header (Scrollspy Mechanism) */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-navy/[0.04]">
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 left-0 nav-indicator-line"
            style={{ width: "11.11%", left: "0%" }}
          />
        </div>
      </header>

      {/* Mobile Drawer Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1A2B49]/95 z-40 lg:hidden backdrop-blur-md flex flex-col justify-between p-8 animate-fade-in pt-24">
          <div className="space-y-4">
            <span className="font-sans text-[9px] tracking-widest text-brand-gold uppercase font-semibold">Danh mục điều hướng</span>
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.index}
                  onClick={() => navigateToSlide(item.index)}
                  className={`text-left font-serif text-2xl font-semibold transition ${activeIndex === item.index ? "text-brand-gold" : "text-white/70 hover:text-white"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-white/10 pt-6 text-white/80">
            <a
              href={`tel:${contentData.brand.hotline.replace(/[^0-9]/g, "")}`}
              className="flex items-center gap-3 font-sans text-sm font-bold"
            >
              <Phone className="w-5 h-5 text-brand-gold" />
              Hotline: {contentData.brand.hotline}
            </a>
            <p className="font-sans text-xs text-white/50">{contentData.brand.address}</p>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModal();
              }}
              className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-sans font-semibold py-3.5 rounded-xl transition"
            >
              Nhận báo giá ngay
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating Right Dots Indicator (Side Nav Scrollspy) */}
      <div
        ref={sideNavRef}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-35 flex-col gap-3.5 hidden md:flex opacity-0"
      >
        {menuItems.map((item) => (
          <button
            key={item.index}
            onClick={() => navigateToSlide(item.index)}
            className="relative flex items-center justify-end group py-1 cursor-pointer"
          >
            {/* Tooltip on hover */}
            <span className="absolute right-6 bg-white border border-brand-navy/5 px-2.5 py-1 rounded text-[10px] font-sans font-bold text-brand-navy tracking-wider uppercase opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-sm whitespace-nowrap">
              {item.label}
            </span>
            {/* Dot */}
            <div className="side-dot w-2 h-2 rounded-full bg-brand-navy/20 transition-all duration-300" />
          </button>
        ))}
      </div>

      {/* 3. Main Slides Sequential Stack */}
      <main className="w-full">

        {/* Slide 1: Hero */}
        <div id="slide-section-0" className="min-h-screen">
          <Slide1Hero
            data={contentData.hero}
            brand={contentData.brand}
            onNavigate={navigateToSlide}
            onOpenQuote={openQuoteModal}
          />
        </div>

        {/* Slide 2: About Story */}
        <div id="slide-section-1" className="min-h-screen">
          <Slide2About data={contentData.about} />
        </div>

        {/* Slide 3: Lodging System */}
        <div id="slide-section-2" className="min-h-screen">
          <Slide3System
            data={contentData.accommodations}
            onSelectVilla={setSelectedVillaId}
            onNavigate={navigateToSlide}
          />
        </div>

        {/* Slide 4: Santoni 3 Detailed Specs */}
        <div id="slide-section-3" className="min-h-screen">
          <Slide4Detail
            data={contentData.villaDetail}
            onNavigate={navigateToSlide}
          />
        </div>

        {/* Slide 5: Pricing Table */}
        <div id="slide-section-4" className="min-h-screen">
          <Slide5Pricing
            data={contentData.pricing}
            onNavigate={navigateToSlide}
          />
        </div>

        {/* Slide 6: Services Amenities */}
        <div id="slide-section-5" className="min-h-screen">
          <Slide6Amenities data={contentData.services} />
        </div>

        {/* Slide 7: Attractions Showcase */}
        <div id="slide-section-6" className="min-h-screen">
          <Slide7Attractions data={contentData.attractions} />
        </div>

        {/* Slide 8: Blog Page */}
        <div id="slide-section-7" className="min-h-screen">
          <Slide8Blog data={contentData.blog} />
        </div>

        {/* Slide 9: Feedback & Contact Form */}
        <div id="slide-section-8" className="min-h-screen">
          <Slide9Contact
            reviews={contentData.reviews}
            brand={contentData.brand}
            selectedVillaId={selectedVillaId}
          />
        </div>

      </main>

      {/* 4. Quick Quote Form Modal with GSAP slide-down */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-[#1A2B49]/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div
            id="quote-modal-card"
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-organic-hover border border-brand-navy/5 relative opacity-0 scale-95"
          >
            {/* Top Bar Banner with Gold accent */}
            <div className="bg-brand-blue p-6 text-white relative">
              <button
                onClick={closeQuoteModal}
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="font-sans text-[9px] tracking-widest text-brand-gold uppercase font-bold block mb-1">
                ƯU ĐÃI ĐẶT PHÒNG HÈ 2026
              </span>
              <h3 className="font-serif text-2xl font-bold tracking-tight">
                Nhận Báo Giá Biệt Thự
              </h3>
              <p className="font-sans text-xs text-white/75 mt-1 font-light">
                Điền thông tin tinh gọn để nhận ngay bảng báo giá kèm ưu đãi tốt nhất trong vòng 5 phút.
              </p>
            </div>

            {/* Modal Body form */}
            <div className="p-6 md:p-8">
              {quoteSuccess ? (
                <div className="text-center py-6 animate-scale-up">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500 mx-auto mb-4">
                    <Sparkles className="w-6 h-6 fill-current" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-brand-navy mb-2">Thông Tin Đã Được Gửi!</h4>
                  <p className="font-sans text-xs text-brand-navy/70 leading-relaxed mb-6">
                    Cảm ơn <strong>{quoteForm.name}</strong>. Quản gia Santoni đang soạn tờ báo giá chi tiết gửi đến số Zalo <strong>{quoteForm.phone}</strong> của bạn.
                  </p>
                  <button
                    onClick={closeQuoteModal}
                    className="bg-brand-blue hover:bg-brand-blue/90 text-white font-sans text-xs font-semibold px-6 py-2.5 rounded-lg transition"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="font-sans text-[10px] font-semibold text-brand-navy/60 uppercase tracking-wider block mb-1">Họ tên của bạn</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Anh Tuấn"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="w-full bg-brand-navy/5 border border-transparent focus:border-brand-blue/20 focus:bg-white rounded-lg px-4 py-2.5 font-sans text-sm outline-none transition"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="font-sans text-[10px] font-semibold text-brand-navy/60 uppercase tracking-wider block mb-1">Số điện thoại / Zalo nhận báo giá</label>
                    <input
                      type="tel"
                      required
                      placeholder="Nhập số điện thoại để gửi file báo giá"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="w-full bg-brand-navy/5 border border-transparent focus:border-brand-blue/20 focus:bg-white rounded-lg px-4 py-2.5 font-sans text-sm outline-none transition"
                    />
                  </div>

                  {/* Guests & Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-sans text-[10px] font-semibold text-brand-navy/60 uppercase tracking-wider block mb-1">Số khách dự kiến</label>
                      <select
                        value={quoteForm.guests}
                        onChange={(e) => setQuoteForm({ ...quoteForm, guests: e.target.value })}
                        className="w-full bg-brand-navy/5 border border-transparent focus:border-brand-blue/20 focus:bg-white rounded-lg px-3 py-2.5 font-sans text-sm outline-none transition cursor-pointer"
                      >
                        <option value="10">Đoàn 10 - 15 khách</option>
                        <option value="15">Đoàn 15 - 20 khách</option>
                        <option value="25">Đoàn 20 - 30 khách</option>
                        <option value="50">Đoàn 30 - 50 khách</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-sans text-[10px] font-semibold text-brand-navy/60 uppercase tracking-wider block mb-1">Ngày đi dự kiến</label>
                      <input
                        type="text"
                        placeholder="Tháng 8 hoặc ngày cụ thể"
                        value={quoteForm.dates}
                        onChange={(e) => setQuoteForm({ ...quoteForm, dates: e.target.value })}
                        className="w-full bg-brand-navy/5 border border-transparent focus:border-brand-blue/20 focus:bg-white rounded-lg px-4 py-2.5 font-sans text-sm outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Submit quote */}
                  <button
                    type="submit"
                    className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-sans font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 mt-6 cursor-pointer transition shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    Nhận tệp báo giá trực tiếp qua Zalo
                  </button>
                </form>
              )}
            </div>

            {/* Modal Footer Banner */}
            <div className="bg-brand-navy/5 p-4 text-center font-sans text-[10px] text-brand-navy/40 border-t border-brand-navy/5">
              📞 Hỗ trợ nhanh 24/7 qua Hotline: {contentData.brand.hotline}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
