"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, ArrowUpRight, Play, ExternalLink, CheckCircle2 } from "lucide-react";
import { WaojeLogo3D } from "@/components/waoje-logo-3d";
import { ContactForm } from "@/components/contact-form";

type BlogPost = { title: string; url: string; pubDate: string; thumbnail: string };

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return "今日";
  if (days < 7) return `${days}日前`;
  if (days < 30) return `${Math.floor(days / 7)}週間前`;
  if (days < 365) return `${Math.floor(days / 30)}か月前`;
  return `${Math.floor(days / 365)}年前`;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.posts)) setBlogPosts(data.posts);
      })
      .catch(() => {})
      .finally(() => setBlogLoading(false));
  }, []);

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
    { name: "GVF2025", href: "#digest" },
    { name: "イベント", href: "#events" },
    { name: "メンバー", href: "#members" },
    { name: "ブログ", href: "#blog" },
    { name: "お問い合わせ", href: "#contact" },
  ];

  const marqueeItems = [
    "WAOJE ドバイ支部",
    "GLOBAL VENTURE FORUM",
    "日本のために、日本を出る。",
    "World Association of Overseas Japanese Entrepreneurs",
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
      date: "2025年はドバイで開催",
      desc: "世界中のWAOJEメンバーが集うWAOJE最大規模のネットワーキングイベント。開催都市は持ち回りで、2025年はドバイ支部がホストを担当。基調講演・パネルディスカッション・表彰式を通じ、次のビジネスの種を見つける3日間。",
      video: "/videos/dubai-difc.mp4",
    },
    {
      title: "月例ミートアップ",
      date: "毎月開催",
      desc: "ドバイ拠点のメンバーによる定期的なビジネスミーティングと交流会。現地の最新情報とリアルな知見を共有します。",
      video: "/videos/dubai-marina.mp4",
    },
    {
      title: "ビジネスパートナーシップ会",
      date: "随時開催",
      desc: "業種を超えた新しいビジネスチャンスとパートナーシップを創造する場。一人では見えない機会が、ここにはあります。",
      video: "/videos/hero-burj.mp4",
    },
  ];

  const members = [
    {
      name: "Wasim Fukase",
      role: "ドバイ支部 2026年度支部長",
      company: "[会社名 プレースホルダー]",
      website: "#",
      linkedin: "#",
      photo: null,
    },
    {
      name: "瀬沼 健吾",
      role: "ドバイ支部 2026年度理事",
      company: "S&K Holdings株式会社 代表取締役",
      website: "https://sandkholdings.co.jp/",
      linkedin: "https://www.linkedin.com/in/kengosenuma/",
      photo: "/images/members/kengo-senuma.jpg",
    },
  ];


  const stats = [
    { value: "447万人", label: "ドバイの人口(2026年時点)" },
    { value: "92%", label: "外国人居住者の割合" },
    { value: "3,433人", label: "在ドバイ日本人数(2025年10月時点)" },
    { value: "5,300人", label: "UAE在留邦人数(2025年10月時点)" },
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
              <WaojeLogo3D size={176} />
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
              <Image src="/brand/waoje-icon.png" alt="WAOJE" width={36} height={33} className="h-8 w-auto" />
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
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/videos/hero-burj.mp4" type="video/mp4" />
            </video>
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
              <span className="text-[#C9A227] text-sm font-bold tracking-[0.2em]">ABOUT DUBAI</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight">
                ドバイについて
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                ドバイは人口の9割以上を外国人が占める、世界でも類を見ない多国籍都市です。所得税・法人税の優遇や、アジア・欧州・アフリカを結ぶ地理的優位性を背景に、世界中の企業家がビジネスの拠点を構えています。
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                WAOJEドバイ支部は、この急成長する経済圏で、日本人起業家同士が新たなビジネスチャンスとパートナーシップを創造するためのコミュニティです。
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
              <h2 className="text-4xl md:text-5xl font-black mt-4">GVF2025 ダイジェスト</h2>
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
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  >
                    <source src={event.video} type="video/mp4" />
                  </video>
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
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src="/videos/dubai-marina.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
              <div className="absolute inset-0 flex items-center px-10">
                <div>
                  <span className="text-[#C9A227] text-sm font-bold tracking-[0.2em]">MEMBERS</span>
                  <h2 className="text-4xl md:text-5xl font-black mt-4">メンバー</h2>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {members.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col items-center text-center gap-2 hover:border-[#C9A227]/50 transition-colors"
                >
                  {m.photo ? (
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-1">
                      <Image src={m.photo} alt={m.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A227] to-[#8a7218] flex items-center justify-center text-black font-black text-2xl mb-1">
                      {m.name.charAt(0)}
                    </div>
                  )}
                  <p className="font-bold text-sm">{m.name}</p>
                  <p className="text-[#C9A227] text-xs font-semibold">{m.role}</p>
                  <p className="text-gray-500 text-xs">{m.company}</p>
                  <div className="flex gap-3 mt-1">
                    {m.website !== "#" && (
                      <a href={m.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C9A227] text-xs underline">
                        HP
                      </a>
                    )}
                    {m.linkedin !== "#" && (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C9A227] text-xs underline">
                        LinkedIn
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`placeholder-${i}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i + members.length) * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 hover:border-[#C9A227]/50 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A227] to-[#8a7218] flex items-center justify-center text-black font-black text-xl">
                    {i + members.length + 1}
                  </div>
                  <p className="text-xs text-gray-500">[メンバー {i + members.length + 1}]</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="relative py-28 px-6 lg:px-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16 flex items-end justify-between flex-wrap gap-4"
            >
              <div>
                <span className="text-[#C9A227] text-sm font-bold tracking-[0.2em]">BLOG</span>
                <h2 className="text-4xl md:text-5xl font-black mt-4">ブログ</h2>
              </div>
              <motion.a
                href="https://note.com/waoje_dubai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 text-[#C9A227] font-bold"
              >
                note で全記事を見る <ExternalLink size={16} />
              </motion.a>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {blogLoading &&
                [0, 1].map((i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] animate-pulse">
                    <div className="h-52 bg-white/5" />
                    <div className="p-6 space-y-3">
                      <div className="h-3 w-20 bg-white/10 rounded" />
                      <div className="h-5 w-3/4 bg-white/10 rounded" />
                    </div>
                  </div>
                ))}
              {!blogLoading &&
                blogPosts.map((post, idx) => (
                  <motion.a
                    key={idx}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.12, duration: 0.7 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                    className="group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-[#C9A227]/50 transition-colors"
                  >
                    <div className="relative h-52 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element -- external note.com CDN thumbnail, domain varies per post */}
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-[#C9A227] text-xs font-bold mb-2">{formatRelativeTime(post.pubDate)}</p>
                      <h3 className="text-lg font-bold leading-snug group-hover:text-[#C9A227] transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </motion.a>
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
            className="relative max-w-lg mx-auto"
          >
            <div className="text-center mb-10">
              <span className="text-[#C9A227] text-sm font-bold tracking-[0.2em]">JOIN US</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">参加・お問い合わせ</h2>
              <p className="text-gray-300 leading-relaxed">
                WAOJEドバイ支部へのご参加やご質問は、お気軽にお問い合わせください。
              </p>
            </div>
            <div className="mb-8 rounded-2xl border border-[#C9A227]/30 bg-[#C9A227]/5 p-6 text-left">
              <p className="text-[#C9A227] text-xs font-bold tracking-[0.15em] mb-4">参加資格</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#C9A227]" />
                  <span className="text-gray-200 text-sm leading-relaxed">UAE（アラブ首長国連邦）に法人があること</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#C9A227]" />
                  <span className="text-gray-200 text-sm leading-relaxed">その法人の代表、又は筆頭株主であること</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#0a0a0a]/70 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <ContactForm />
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[#0a0a0a] py-12 px-6 lg:px-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <Image src="/brand/waoje-icon.png" alt="WAOJE" width={28} height={26} className="h-6 w-auto" />
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
