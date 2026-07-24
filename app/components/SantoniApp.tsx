"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Phone, Menu, X, Sparkles, Send } from "lucide-react";

import { ContentData } from "../types";
import Slide1Hero from "./Slide1Hero";
import Slide2About from "./Slide2About";
import Slide3System from "./Slide3System";
import Slide4Detail from "./Slide4Detail";
import Slide5Pricing from "./Slide5Pricing";
import Slide6Amenities from "./Slide6Amenities";
import Slide7Attractions from "./Slide7Attractions";
import Slide8Blog from "./Slide8Blog";
import Slide9Contact from "./Slide9Contact";

import { getAssetUrl } from "../utils/image";

interface SantoniAppProps {
  data: ContentData;
}

export default function SantoniApp({ data }: SantoniAppProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedVillaId, setSelectedVillaId] = useState("santoni-3");

  const [quoteForm, setQuoteForm] = useState({
    name: "",
    phone: "",
    guests: "15",
    dates: "",
  });
  const [quoteSuccess, setQuoteSuccess] = useState(false);

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
    { label: "Liên Hệ", index: 8 },
  ];

  // GSAP scrollspy indicator line
  useEffect(() => {
    if (lineRef.current) {
      const totalSegments = menuItems.length;
      const segmentWidthPercent = 100 / totalSegments;
      gsap.to(lineRef.current, {
        left: `${activeIndex * segmentWidthPercent}%`,
        width: `${segmentWidthPercent}%`,
        duration: 0.55,
        ease: "power2.out",
      });
    }

    if (sideNavRef.current) {
      const dots = sideNavRef.current.querySelectorAll(".side-dot");
      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          gsap.to(dot, { scale: 1.4, backgroundColor: "#0A5C96", duration: 0.3 });
        } else {
          gsap.to(dot, {
            scale: 1,
            backgroundColor: activeIndex === 0 ? "rgba(255,255,255,0.45)" : "rgba(26,43,73,0.25)",
            duration: 0.3,
          });
        }
      });
    }
  }, [activeIndex]);

  // Initial load GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
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
    const sections = menuItems.map((item) =>
      document.getElementById(`slide-section-${item.index}`)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idStr = entry.target.id;
            const idx = parseInt(idStr.split("slide-section-")[1], 10);
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.35, rootMargin: "-10% 0px -40% 0px" }
    );

    sections.forEach((sec) => { if (sec) observer.observe(sec); });
    return () => { sections.forEach((sec) => { if (sec) observer.unobserve(sec); }); };
  }, []);

  const navigateToSlide = (index: number) => {
    const target = document.getElementById(`slide-section-${index}`);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

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
      onComplete: () => setShowQuoteModal(false),
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

      {/* Header (Modern Floating Glassmorphic Navigation) */}
      <header
        ref={headerRef}
        className="fixed top-4 left-4 right-4 md:left-8 md:right-8 z-40 h-20 opacity-0 pointer-events-none"
      >
        <div className="w-full h-full max-w-7xl mx-auto glass-header rounded-full px-6 md:px-8 flex items-center justify-between shadow-organic border border-white/60 backdrop-blur-xl bg-white/75 pointer-events-auto transition-all duration-300 hover:shadow-organic-hover">
          {/* Logo with Official Santoni.vn Emblem */}
          <div
            onClick={() => navigateToSlide(0)}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-brand-gold/30 p-0.5 bg-gradient-to-br from-white via-brand-dominant to-brand-gold/10 group-hover:border-brand-gold group-hover:scale-105 transition-all duration-300 shadow-sm">
              <img
                src={getAssetUrl("/logo-santoni.webp")}
                alt="Santoni Homestay Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-brand-navy group-hover:text-brand-blue transition-colors">
                {data.brand.name}
              </span>
              <span className="font-sans text-[9px] tracking-[0.2em] text-brand-gold font-bold uppercase leading-none mt-0.5">
                SANTONI MŨI NÉ • VILLA & RESORT
              </span>
            </div>
          </div>

          {/* Streamlined Desktop Navigation (4 core links + 1 dropdown) */}
          <nav className="hidden lg:flex items-center gap-1 bg-brand-navy/[0.03] p-1.5 rounded-full border border-brand-navy/[0.04]">
            {/* 1. Trang chủ */}
            <button
              onClick={() => navigateToSlide(0)}
              className={`font-sans text-[11px] font-semibold tracking-wider uppercase cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
                activeIndex === 0
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 font-bold"
                  : "text-brand-navy/70 hover:text-brand-blue hover:bg-brand-blue/5"
              }`}
            >
              Trang Chủ
            </button>

            {/* 2. Biệt thự & Villa */}
            <button
              onClick={() => navigateToSlide(2)}
              className={`font-sans text-[11px] font-semibold tracking-wider uppercase cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
                activeIndex === 2 || activeIndex === 3
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 font-bold"
                  : "text-brand-navy/70 hover:text-brand-blue hover:bg-brand-blue/5"
              }`}
            >
              Hệ Thống Villa
            </button>

            {/* 3. Bảng giá */}
            <button
              onClick={() => navigateToSlide(4)}
              className={`font-sans text-[11px] font-semibold tracking-wider uppercase cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
                activeIndex === 4
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 font-bold"
                  : "text-brand-navy/70 hover:text-brand-blue hover:bg-brand-blue/5"
              }`}
            >
              Bảng Giá
            </button>

            {/* 4. Khám Phá Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsExploreOpen(true)}
              onMouseLeave={() => setIsExploreOpen(false)}
            >
              <button
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className={`font-sans text-[11px] font-semibold tracking-wider uppercase cursor-pointer px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                  [1, 5, 6, 7].includes(activeIndex)
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 font-bold"
                    : "text-brand-navy/70 hover:text-brand-blue hover:bg-brand-blue/5"
                }`}
              >
                <span>Khám Phá</span>
                <span className={`text-[9px] transition-transform duration-300 ${isExploreOpen ? "rotate-180 text-brand-gold" : ""}`}>▼</span>
              </button>

              {/* Dropdown Menu Overlay Container (with invisible hover bridge pt-2) */}
              <div
                className={`absolute top-full left-0 pt-2 w-52 pointer-events-auto transition-all duration-300 z-50 ${
                  isExploreOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-2 shadow-2xl border border-brand-navy/10 ring-1 ring-black/5">
                  <button
                    onClick={() => { navigateToSlide(1); setIsExploreOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-sans font-medium text-brand-navy/80 hover:bg-brand-blue/10 hover:text-brand-blue transition flex items-center gap-2 cursor-pointer group"
                  >
                    <span className="text-sm">📖</span>
                    <span className="group-hover:translate-x-1 transition-transform">Câu Chuyện Santoni</span>
                  </button>

                  <button
                    onClick={() => { navigateToSlide(5); setIsExploreOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-sans font-medium text-brand-navy/80 hover:bg-brand-blue/10 hover:text-brand-blue transition flex items-center gap-2 cursor-pointer group"
                  >
                    <span className="text-sm">⭐</span>
                    <span className="group-hover:translate-x-1 transition-transform">Tiện Ích Dịch Vụ</span>
                  </button>

                  <button
                    onClick={() => { navigateToSlide(6); setIsExploreOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-sans font-medium text-brand-navy/80 hover:bg-brand-blue/10 hover:text-brand-blue transition flex items-center gap-2 cursor-pointer group"
                  >
                    <span className="text-sm">🗺️</span>
                    <span className="group-hover:translate-x-1 transition-transform">Điểm Đến Mũi Né</span>
                  </button>

                  <button
                    onClick={() => { navigateToSlide(7); setIsExploreOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-sans font-medium text-brand-navy/80 hover:bg-brand-blue/10 hover:text-brand-blue transition flex items-center gap-2 cursor-pointer group"
                  >
                    <span className="text-sm">📝</span>
                    <span className="group-hover:translate-x-1 transition-transform">Cẩm Nang Du Lịch</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 5. Liên Hệ */}
            <button
              onClick={() => navigateToSlide(8)}
              className={`font-sans text-[11px] font-semibold tracking-wider uppercase cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
                activeIndex === 8
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 font-bold"
                  : "text-brand-navy/70 hover:text-brand-blue hover:bg-brand-blue/5"
              }`}
            >
              Liên Hệ
            </button>
          </nav>

          {/* Right CTA Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${data.brand.hotline.replace(/[^0-9]/g, "")}`}
              className="font-sans text-xs font-bold text-brand-navy/80 hover:text-brand-blue bg-brand-navy/[0.03] hover:bg-brand-navy/[0.07] px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 border border-brand-navy/5"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Phone className="w-3.5 h-3.5 text-brand-blue shrink-0" />
              <span>{data.brand.hotline}</span>
            </a>

            <button
              id="header-quote-btn"
              onClick={openQuoteModal}
              className="bg-gradient-to-r from-brand-gold via-[#E8BD65] to-brand-gold hover:brightness-105 text-brand-navy font-sans text-xs font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-brand-gold/20 hover:scale-105 active:scale-95 cursor-pointer border border-brand-gold/40 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current text-brand-navy" />
              Nhận báo giá
            </button>
          </div>

          {/* Ultra-Modern Animated Morphing Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="relative lg:hidden w-11 h-11 rounded-full bg-white/90 border border-brand-gold/30 hover:border-brand-gold shadow-sm transition-all duration-300 flex items-center justify-center cursor-pointer group hover:bg-brand-blue/5"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between items-center">
              <span
                className={`w-5 h-0.5 bg-brand-navy group-hover:bg-brand-blue rounded-full transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "rotate-45 translate-y-[7px] bg-brand-blue" : ""
                }`}
              />
              <span
                className={`w-3.5 h-0.5 bg-brand-gold rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0 scale-0" : "group-hover:w-5"
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-brand-navy group-hover:bg-brand-blue rounded-full transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[7px] bg-brand-blue" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1A2B49]/95 z-40 lg:hidden backdrop-blur-md flex flex-col justify-between p-8 pt-24">
          <div className="space-y-4">
            <span className="font-sans text-[9px] tracking-widest text-brand-gold uppercase font-semibold">Danh mục điều hướng</span>
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.index}
                  onClick={() => navigateToSlide(item.index)}
                  className={`text-left font-serif text-2xl font-semibold transition ${
                    activeIndex === item.index ? "text-brand-gold" : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-white/10 pt-6 text-white/80">
            <a href={`tel:${data.brand.hotline.replace(/[^0-9]/g, "")}`} className="flex items-center gap-3 font-sans text-sm font-bold">
              <Phone className="w-5 h-5 text-brand-gold" />
              Hotline: {data.brand.hotline}
            </a>
            <p className="font-sans text-xs text-white/50">{data.brand.address}</p>
            <button
              onClick={() => { setMobileMenuOpen(false); openQuoteModal(); }}
              className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-sans font-semibold py-3.5 rounded-xl transition cursor-pointer"
            >
              Nhận báo giá ngay
            </button>
          </div>
        </div>
      )}

      {/* Floating Side Dots */}
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
            <span className="absolute right-6 bg-white border border-brand-navy/5 px-2.5 py-1 rounded text-[10px] font-sans font-bold text-brand-navy tracking-wider uppercase opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-sm whitespace-nowrap">
              {item.label}
            </span>
            <div className="side-dot w-2 h-2 rounded-full bg-brand-navy/20 transition-all duration-300" />
          </button>
        ))}
      </div>

      {/* Main Slides */}
      <main className="w-full pt-20">
        <div id="slide-section-0" className="min-h-screen">
          <Slide1Hero data={data.hero} brand={data.brand} onNavigate={navigateToSlide} onOpenQuote={openQuoteModal} />
        </div>
        <div id="slide-section-1" className="min-h-screen">
          <Slide2About data={data.about} />
        </div>
        <div id="slide-section-2" className="min-h-screen">
          <Slide3System data={data.accommodations} onSelectVilla={setSelectedVillaId} onNavigate={navigateToSlide} />
        </div>
        <div id="slide-section-3" className="min-h-screen">
          <Slide4Detail data={data.villaDetail} onNavigate={navigateToSlide} />
        </div>
        <div id="slide-section-4" className="min-h-screen">
          <Slide5Pricing data={data.pricing} onNavigate={navigateToSlide} />
        </div>
        <div id="slide-section-5" className="min-h-screen">
          <Slide6Amenities data={data.services} />
        </div>
        <div id="slide-section-6" className="min-h-screen">
          <Slide7Attractions data={data.attractions} />
        </div>
        <div id="slide-section-7" className="min-h-screen">
          <Slide8Blog data={data.blog} />
        </div>
        <div id="slide-section-8" className="min-h-screen">
          <Slide9Contact reviews={data.reviews} brand={data.brand} selectedVillaId={selectedVillaId} />
        </div>
      </main>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-[#1A2B49]/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div
            id="quote-modal-card"
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-organic-hover border border-brand-navy/5 relative opacity-0 scale-95"
          >
            {/* Modal Header */}
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
              <h3 className="font-serif text-2xl font-bold tracking-tight">Nhận Báo Giá Biệt Thự</h3>
              <p className="font-sans text-xs text-white/75 mt-1 font-light">
                Điền thông tin tinh gọn để nhận ngay bảng báo giá kèm ưu đãi tốt nhất trong vòng 5 phút.
              </p>
            </div>

            {/* Modal Body */}
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
                    className="bg-brand-blue hover:bg-brand-blue/90 text-white font-sans text-xs font-semibold px-6 py-2.5 rounded-lg transition cursor-pointer"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div>
                    <label className="font-sans text-[10px] font-semibold text-brand-navy/60 uppercase tracking-wider block mb-1">Họ tên của bạn</label>
                    <input
                      id="quote-name"
                      type="text"
                      required
                      placeholder="Ví dụ: Anh Tuấn"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="w-full bg-brand-navy/5 border border-transparent focus:border-brand-blue/20 focus:bg-white rounded-lg px-4 py-2.5 font-sans text-sm outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-[10px] font-semibold text-brand-navy/60 uppercase tracking-wider block mb-1">Số điện thoại / Zalo nhận báo giá</label>
                    <input
                      id="quote-phone"
                      type="tel"
                      required
                      placeholder="Nhập số điện thoại để gửi file báo giá"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="w-full bg-brand-navy/5 border border-transparent focus:border-brand-blue/20 focus:bg-white rounded-lg px-4 py-2.5 font-sans text-sm outline-none transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-sans text-[10px] font-semibold text-brand-navy/60 uppercase tracking-wider block mb-1">Số khách dự kiến</label>
                      <select
                        id="quote-guests"
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
                        id="quote-dates"
                        type="text"
                        placeholder="Tháng 8 hoặc ngày cụ thể"
                        value={quoteForm.dates}
                        onChange={(e) => setQuoteForm({ ...quoteForm, dates: e.target.value })}
                        className="w-full bg-brand-navy/5 border border-transparent focus:border-brand-blue/20 focus:bg-white rounded-lg px-4 py-2.5 font-sans text-sm outline-none transition"
                      />
                    </div>
                  </div>
                  <button
                    id="quote-submit-btn"
                    type="submit"
                    className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-sans font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 mt-6 cursor-pointer transition shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    Nhận tệp báo giá trực tiếp qua Zalo
                  </button>
                </form>
              )}
            </div>

            <div className="bg-brand-navy/5 p-4 text-center font-sans text-[10px] text-brand-navy/40 border-t border-brand-navy/5">
              📞 Hỗ trợ nhanh 24/7 qua Hotline: {data.brand.hotline}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
