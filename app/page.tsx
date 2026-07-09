"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, ArrowUpRight, Play } from "lucide-react";
import { WaojeLogo } from "@/components/waoje-logo";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navLinks = [
    { name: "概要", href: "#about" },
    { name: "ダイジェスト", href: "#digest" },
    { name: "イベント", href: "#events" },
    { name: "メンバー", href: "#members" },
    { name: "お問い合わせ", href: "#contact" },
  ];

  const marqueeItems = [
    "WAOJE ドバイ支部",
    "GLOBAL VENTURE FORUM",
    "日本のために、日本を出る。",
    "JAPANESE ENTREPRENEURS NETWORK",
    "DUBAI CHAPTER",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  const events = [
    {
      title: "Global Venture Forum",
      date: "年1回開催",
      desc: "世界中のWAOJEメンバーが集う最大規模のネットワーキングイベント。基調講演・パネルディスカッション・表彰式を通じ、次のビジネスの種を見つける3日間。",
      img: "/images/panel-discussion.jpg",
    },
    {
      title: "月例ミートアップ",
      date: "毎月開催",
      desc: "ドバイ拠点のメンバーによる定期的なビジネスミーティングと交流会。現地の最新情報とリアルな知見を共有します。",
      img: "/images/gala-toast.jpg",
    },
    {
      title: "ビジネスパートナーシップ会",
      date: "随時開催",
      desc: "業種を超えた新しいビジネスチャンスとパートナーシップを創造する場。一人では見えない機会が、ここにはあります。",
      img: "/images/audience-wide.jpg",
    },
  ];

  const stats = [
    { value: "2004", label: "香港での創立" },
    { value: "20+", label: "拠点都市" },
    { value: "2017", label: "WAOJE 発足" },
    { value: "1", label: "ドバイ支部" },
  ];

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center"
          >
            <div className="relative w-44 h-44 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C9A227]/20 to-[#E4342A]/10 blur-3xl" />
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
                style={{ perspective: "1200px" }}
                className="w-36 h-40"
              >
                <WaojeLogo className="w-full h-full" stroke="#C9A227" dot="#E4342A" />
              </motion.div>
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-[#C9A227] text-xs font-bold tracking-[0.3em]"
              >
                WAOJE DUBAI
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-[#C9A227] selection:text-black">
        {/* Grain Overlay */}
        <div
          className="fixed inset-0 opacity-[0.035] pointer-events-none z-[1] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')",
          }}
        />

        {/* Mouse Glow */}
        <motion.div
          className="fixed w-[500px] h-[500px] bg-gradient-to-r from-[#C9A227]/10 to-transparent rounded-full blur-3xl pointer-events-none z-[1]"
          animate={{ x: mousePosition.x - 250, y: mousePosition.y - 250 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
        />

        {/* Navigation */}
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-500 ${
            scrolled ? "bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <WaojeLogo className="w-8 h-9" stroke="#C9A227" dot="#E4342A" />
              <span className="text-lg font-bold tracking-wide">
                WAOJE <span className="text-[#C9A227]">Dubai</span>
              </span>
            </motion.a>

            <div className="hidden md:flex gap-10">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className="text-sm font-medium text-gray-300 hover:text-[#C9A227] transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C9A227] transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 border border-[#C9A227]/60 text-[#C9A227] text-sm font-bold rounded-full hover:bg-[#C9A227] hover:text-black transition-all"
            >
              入会する <ArrowUpRight size={15} />
            </motion.a>

            <button className="md:hidden text-[#C9A227]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-white/10"
              >
                <div className="px-6 py-6 flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-200 font-semibold text-lg"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section */}
        <section ref={heroRef} className="relative isolate h-[110vh] flex items-end overflow-hidden">
          <motion.div
            style={{ y: heroImageY, scale: heroImageScale }}
            className="absolute inset-0 -z-10"
          >
            <Image src="/images/hero-skyline.jpg" alt="Dubai skyline" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            style={{ opacity: heroTextOpacity, y: heroTextY }}
            className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-28 w-full"
          >
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#C9A227]" />
                <span className="text-[#C9A227] text-sm font-bold tracking-[0.25em]">WAOJE ドバイ支部</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.98] mb-8 max-w-4xl"
              >
                日本のために、
                <br />
                日本を出る。
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mb-10 font-light"
              >
                中東の中心地・ドバイを拠点に、グローバルなビジネスチャンスと出会いを創造する日本人起業家のコミュニティ。
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-9 py-4 bg-[#C9A227] text-black font-bold rounded-full text-center hover:shadow-[0_0_40px_rgba(201,162,39,0.4)] transition-shadow"
                >
                  入会する
                </motion.a>
                <motion.a
                  href="#digest"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-9 py-4 border border-white/30 text-white font-bold rounded-full text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Play size={16} fill="white" /> ダイジェストを見る
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Marquee */}
        <div className="relative bg-[#C9A227] py-4 overflow-hidden border-y border-black/10">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="text-black font-bold text-lg mx-8 flex items-center gap-8">
                {item} <span className="text-black/40">◆</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <section className="py-20 px-6 lg:px-10 border-b border-white/10">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-[#C9A227] mb-2">{s.value}</div>
                <div className="text-sm text-gray-400 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-28 px-6 lg:px-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <Image src="/images/towers-palm.jpg" alt="Dubai architecture" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <span className="text-[#C9A227] text-sm font-bold tracking-[0.2em]">ABOUT</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight">
                WAOJE について
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                WAOJEは、海外を拠点に活躍する日本人起業家のグローバルネットワークです。2004年、香港で7名の起業家が立ち上げた小さなコミュニティは、2017年に「WAOJE」として再編され、現在は世界20都市以上に拠点を広げています。
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                ドバイ支部では、中東の急成長する経済圏を背景に、新たなビジネスチャンスとパートナーシップを日本人起業家同士で創造しています。
              </p>
              <motion.a href="#events" whileHover={{ x: 6 }} className="inline-flex items-center gap-2 text-[#C9A227] font-bold">
                イベントを見る <ArrowUpRight size={18} />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Digest Video Section */}
        <section id="digest" className="relative py-28 px-6 lg:px-10 bg-gradient-to-b from-transparent via-[#C9A227]/5 to-transparent">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-[#C9A227] text-sm font-bold tracking-[0.2em]">GVF 2025 DUBAI</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4">全体ダイジェスト</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border border-[#C9A227]/30 shadow-2xl"
            >
              <video className="w-full aspect-video object-cover" controls poster="/images/gvf-poster.jpg" preload="metadata">
                <source src="/videos/gvf-digest-web.mp4" type="video/mp4" />
              </video>
            </motion.div>

            <p className="text-center text-gray-400 mt-8 leading-relaxed">
              Global Venture Forum 2025 Dubai の全体ダイジェスト。世界中の起業家が集った3日間の記録。
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="relative py-28 px-6 lg:px-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <span className="text-[#C9A227] text-sm font-bold tracking-[0.2em]">EVENTS</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4">主なイベント</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {events.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.12, duration: 0.7 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="relative rounded-2xl overflow-hidden h-96 group cursor-pointer"
                >
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
                  <div className="absolute bottom-0 left-0 p-7">
                    <div className="h-1 w-10 bg-[#C9A227] mb-4 group-hover:w-full transition-all duration-500" />
                    <p className="text-[#C9A227] text-sm font-bold mb-2">{event.date}</p>
                    <h3 className="text-2xl font-black mb-2">{event.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{event.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Members Section */}
        <section id="members" className="relative py-28 px-6 lg:px-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-64 rounded-2xl overflow-hidden mb-16"
            >
              <Image src="/images/audience-wide.jpg" alt="WAOJE community" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
              <div className="absolute inset-0 flex items-center px-10">
                <div>
                  <span className="text-[#C9A227] text-sm font-bold tracking-[0.2em]">MEMBERS</span>
                  <h2 className="text-4xl md:text-5xl font-black mt-4">メンバー</h2>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 hover:border-[#C9A227]/50 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A227] to-[#8a7218] flex items-center justify-center text-black font-black text-xl">
                    {i + 1}
                  </div>
                  <p className="text-xs text-gray-500">[メンバー {i + 1}]</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Award / CTA Section */}
        <section id="contact" className="relative isolate py-32 px-6 lg:px-10 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image src="/images/award-ceremony.jpg" alt="WAOJE award ceremony" fill className="object-cover" />
            <div className="absolute inset-0 bg-[#0a0a0a]/85" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative max-w-2xl mx-auto text-center"
          >
            <span className="text-[#C9A227] text-sm font-bold tracking-[0.2em]">JOIN US</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">参加・お問い合わせ</h2>
            <p className="text-gray-300 mb-10 leading-relaxed">
              WAOJEドバイ支部へのご参加やご質問は、お気軽にお問い合わせください。
            </p>
            <motion.a
              href="mailto:contact@waojedubai.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block px-12 py-4 bg-[#C9A227] text-black font-black rounded-full hover:shadow-[0_0_50px_rgba(201,162,39,0.5)] transition-shadow"
            >
              お問い合わせフォーム
            </motion.a>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[#0a0a0a] py-12 px-6 lg:px-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <WaojeLogo className="w-6 h-7" stroke="#C9A227" dot="#E4342A" />
              <span className="text-sm text-gray-400">© 2026 WAOJE Dubai. All rights reserved.</span>
            </div>
            <div className="flex gap-8">
              {["Facebook", "LinkedIn", "Instagram"].map((social) => (
                <motion.a key={social} href="#" whileHover={{ color: "#C9A227" }} className="text-gray-400 text-sm font-semibold">
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
