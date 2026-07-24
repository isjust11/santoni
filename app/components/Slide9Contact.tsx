"use client";

import React, { useState } from "react";
import { Star, Send, Phone, MessageSquare, ExternalLink, MapPin, Mail, Share2 } from "lucide-react";
import { ReviewItem, BrandInfo } from "../types";

interface Slide9ContactProps {
  reviews: ReviewItem[];
  brand: BrandInfo;
  selectedVillaId?: string;
}

export default function Slide9Contact({ reviews, brand, selectedVillaId }: Slide9ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    villa: selectedVillaId || "santoni-3",
    dates: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Vui lòng nhập họ tên và số điện thoại của bạn!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const getVillaName = (id: string) => {
    switch (id) {
      case "santoni-1": return "Biệt thự Santoni 1 (4 phòng)";
      case "santoni-2": return "Biệt thự Santoni 2 (6 phòng)";
      case "santoni-3": return "Siêu biệt thự Santoni 3 (8 phòng)";
      case "resort-santoni": return "Khu phức hợp Resort Santoni (15 phòng)";
      default: return "Siêu biệt thự Santoni 3 (8 phòng)";
    }
  };

  return (
    <section className="relative w-full min-h-screen py-20 px-6 md:px-12 lg:px-20 bg-brand-dominant flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-blue font-sans font-semibold text-xs tracking-[0.25em] uppercase mb-3 block">
            08 / PHẢN HỒI & LIÊN HỆ ĐẶT PHÒNG
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-brand-navy tracking-tight font-bold mb-4">
            Trải Nghiệm & Kết Nối
          </h2>
          <p className="text-brand-navy/60 font-sans font-light text-sm md:text-base leading-relaxed">
            Xem những đánh giá chân thực từ hàng ngàn khách lưu trú hài lòng, gửi yêu cầu đặt biệt thự hoặc gọi trực tiếp bộ phận quản gia hỗ trợ bạn.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Reviews */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white/50 backdrop-blur-md rounded-2xl border border-brand-navy/5 shadow-organic p-6">
            <div>
              <div className="flex items-center justify-between border-b border-brand-navy/5 pb-4 mb-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-navy">Đánh giá Google Maps</h3>
                  <p className="font-sans text-xs text-brand-navy/50">Đánh giá thực tế từ khách hàng</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center text-brand-gold gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="font-sans text-xs font-bold text-brand-blue mt-1">4.9 / 5.0 (284 reviews)</span>
                </div>
              </div>

              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                {reviews.map((rev, idx) => (
                  <div key={idx} className="bg-white/80 border border-brand-navy/5 rounded-xl p-4 shadow-sm hover:border-brand-gold/20 transition duration-300">
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center font-sans text-sm font-bold text-brand-blue">
                        {rev.avatar}
                      </div>
                      <div>
                        <h4 className="font-sans text-xs font-bold text-brand-navy">{rev.name}</h4>
                        <span className="font-sans text-[10px] text-brand-navy/50 block leading-none mt-0.5">{rev.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-brand-gold gap-0.5 mb-2">
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <p className="font-sans text-xs text-brand-navy/70 leading-relaxed font-light">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-navy/5 text-center">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans font-semibold text-brand-blue hover:text-brand-gold transition tracking-wider uppercase"
              >
                Xem tất cả 284+ đánh giá Google Maps →
              </a>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-brand-navy/5 shadow-organic p-6 flex flex-col justify-between">
            {isSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 animate-scale-up">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                  <Star className="w-8 h-8 fill-current" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-navy mb-2">Gửi Yêu Cầu Thành Công!</h3>
                <p className="font-sans text-xs text-brand-navy/70 leading-relaxed mb-6">
                  Cảm ơn <strong>{formData.name}</strong>. Bộ phận quản gia phụ trách <strong>{getVillaName(formData.villa)}</strong> đã tiếp nhận số điện thoại <strong>{formData.phone}</strong> và sẽ liên hệ tư vấn trong 5 - 10 phút qua điện thoại hoặc Zalo.
                </p>
                <button
                  onClick={() => { setIsSuccess(false); setFormData({ name: "", phone: "", villa: "santoni-3", dates: "", message: "" }); }}
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white font-sans text-xs px-6 py-2.5 rounded-lg transition cursor-pointer"
                >
                  Gửi yêu cầu mới
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-navy mb-1">Nhận Báo Giá & Đặt Chỗ</h3>
                  <p className="font-sans text-xs text-brand-navy/50 mb-6">Cam kết bảo mật thông tin liên hệ của bạn</p>
                  <div className="space-y-4">
                    <div>
                      <label className="font-sans text-[11px] font-semibold text-brand-navy/70 uppercase tracking-wider block mb-1">
                        Họ và Tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Ví dụ: Nguyễn Văn A"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-brand-navy/5 border border-transparent focus:border-brand-blue/30 focus:bg-white rounded-lg px-4 py-2.5 font-sans text-sm outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-[11px] font-semibold text-brand-navy/70 uppercase tracking-wider block mb-1">
                        Số điện thoại / Zalo <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="Số liên hệ (Để tư vấn qua Zalo)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-brand-navy/5 border border-transparent focus:border-brand-blue/30 focus:bg-white rounded-lg px-4 py-2.5 font-sans text-sm outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-[11px] font-semibold text-brand-navy/70 uppercase tracking-wider block mb-1">
                        Chọn Căn Biệt Thự
                      </label>
                      <select
                        id="contact-villa"
                        value={formData.villa}
                        onChange={(e) => setFormData({ ...formData, villa: e.target.value })}
                        className="w-full bg-brand-navy/5 border border-transparent focus:border-brand-blue/30 focus:bg-white rounded-lg px-4 py-2.5 font-sans text-sm outline-none transition cursor-pointer"
                      >
                        <option value="santoni-1">Biệt thự Santoni 1 (4 phòng ngủ)</option>
                        <option value="santoni-2">Biệt thự Santoni 2 (6 phòng ngủ)</option>
                        <option value="santoni-3">Siêu biệt thự Santoni 3 (8 phòng ngủ)</option>
                        <option value="resort-santoni">Khu phức hợp Resort Santoni (15 phòng)</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-sans text-[11px] font-semibold text-brand-navy/70 uppercase tracking-wider block mb-1">
                        Dự kiến ngày đi & Số người
                      </label>
                      <input
                        id="contact-dates"
                        type="text"
                        placeholder="Ví dụ: 20/08 - 22/08, đoàn 15 người"
                        value={formData.dates}
                        onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                        className="w-full bg-brand-navy/5 border border-transparent focus:border-brand-blue/30 focus:bg-white rounded-lg px-4 py-2.5 font-sans text-sm outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-[11px] font-semibold text-brand-navy/70 uppercase tracking-wider block mb-1">
                        Yêu cầu đặc biệt (Nếu có)
                      </label>
                      <textarea
                        id="contact-message"
                        rows={2}
                        placeholder="Ví dụ: Cần setup BBQ bãi biển, hỗ trợ loa kéo..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-brand-navy/5 border border-transparent focus:border-brand-blue/30 focus:bg-white rounded-lg px-4 py-2.5 font-sans text-sm outline-none transition resize-none"
                      />
                    </div>
                  </div>
                </div>
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 disabled:bg-brand-blue/50 text-white font-sans font-medium text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 mt-6 cursor-pointer transition shadow-md shadow-brand-blue/15"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Đang gửi thông tin..." : "Gửi thông tin đặt chỗ"}
                </button>
              </form>
            )}
          </div>

          {/* Map & Contact Links */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="bg-white/50 backdrop-blur-md rounded-2xl border border-brand-navy/5 shadow-organic p-4 h-[240px] flex flex-col justify-between overflow-hidden">
              <iframe
                title="Bản đồ chỉ đường Santoni Mũi Né"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3905.1090158448995!2d108.2838936!3d10.9324317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31768676d1e57c6b%3A0xc3fbfdc16ff90b20!2zMTM5IEh14buzbmggVGjDumMgS2jDoW5nLCBNxaluIE7DqSwgVGjDoG5oIHBo4buRIFBoYW4gVGhp4bq_dCwgQsOsbmggVGh14bqtbg!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                className="w-full h-full rounded-xl border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="bg-white/50 backdrop-blur-md rounded-2xl border border-brand-navy/5 shadow-organic p-6 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-base font-bold text-brand-navy mb-4">Kết Nối Đa Kênh</h4>
                <div className="space-y-3 font-sans text-xs md:text-sm">
                  <div className="flex items-start gap-2.5 text-brand-navy/80">
                    <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                    <span className="leading-tight">{brand.address}</span>
                  </div>
                  <a href={`tel:${brand.hotline.replace(/[^0-9]/g, "")}`} className="flex items-center gap-2.5 text-brand-navy/80 hover:text-brand-blue transition">
                    <Phone className="w-5 h-5 text-brand-blue shrink-0" />
                    <span className="font-bold">{brand.hotline} (Bộ phận booking)</span>
                  </a>
                  <a href={`mailto:${brand.email}`} className="flex items-center gap-2.5 text-brand-navy/80 hover:text-brand-blue transition">
                    <Mail className="w-5 h-5 text-brand-blue shrink-0" />
                    <span>{brand.email}</span>
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-navy/5">
                <p className="font-sans text-[10px] uppercase text-brand-navy/40 tracking-widest mb-3">Tìm chúng tôi trên mạng xã hội</p>
                <div className="flex items-center gap-3">
                  <a href={brand.zalo} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#0068FF]/10 hover:bg-[#0068FF]/20 text-[#0068FF] font-sans font-semibold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition">
                    <MessageSquare className="w-4 h-4 fill-current" />
                    Zalo
                  </a>
                  <a href={brand.facebook} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] font-sans font-semibold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition">
                    <ExternalLink className="w-4 h-4" />
                    Facebook
                  </a>
                  <a href={brand.tiktok} target="_blank" rel="noopener noreferrer" className="p-2 bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-navy rounded-lg transition" title="TikTok">
                    <Share2 className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-brand-navy/10 text-center font-sans text-[11px] text-brand-navy/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 {brand.name}. Tất cả các quyền được bảo lưu. Thiết kế lấy cảm hứng từ Aman Resorts.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-brand-blue cursor-pointer">Chính sách bảo mật</span>
            <span className="hover:text-brand-blue cursor-pointer">Điều khoản sử dụng</span>
            <span className="hover:text-brand-blue cursor-pointer">Chính sách hủy phòng</span>
          </div>
        </div>
      </div>
    </section>
  );
}
