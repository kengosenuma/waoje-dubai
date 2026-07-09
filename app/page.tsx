"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sparkles, Zap } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navLinks = [
    { name: "概要", href: "#about" },
    { name: "イベント", href: "#events" },
    { name: "メンバー", href: "#members" },
    { name: "お問い合わせ", href: "#contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          >
            <div className="relative w-48 h-48">
              {/* Background Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 blur-2xl" />

              {/* 3D Rotating WAOJE Logo */}
              <motion.div
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 180, 360],
                  rotateZ: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ perspective: "1200px" }}
                className="w-full h-full flex items-center justify-center"
              >
                <svg viewBox="0 0 200 240" className="w-40 h-48 drop-shadow-lg">
                  {/* Outer Triangle */}
                  <path d="M 100 20 L 30 160 L 170 160 Z" fill="none" stroke="#000000" strokeWidth="5" strokeLinejoin="round"/>
                  {/* Inner Triangle */}
                  <path d="M 100 50 L 55 140 L 145 140 Z" fill="none" stroke="#000000" strokeWidth="5" strokeLinejoin="round"/>
                  {/* Red Circle */}
                  <circle cx="100" cy="100" r="12" fill="#EF4444"/>
                  {/* Text */}
                  <text x="100" y="195" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" textAnchor="middle" fill="#000000" letterSpacing="2">WAOJE</text>
                </svg>
              </motion.div>

              {/* Orbiting Elements */}
              {[0, 120, 240].map((rotation) => (
                <motion.div
                  key={rotation}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{ perspective: "1000px" }}
                >
                  <div
                    className="absolute w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%) rotateZ(${rotation}deg) translateX(80px)`,
                    }}
                  />
                </motion.div>
              ))}

              {/* Loading Text */}
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
              >
                <p className="text-amber-400 font-bold text-sm tracking-widest">読み込み中...</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-amber-950/20 via-black to-blue-950/20 pointer-events-none" />
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><rect fill=\"%23FFD700\" width=\"1\" height=\"100\"/><rect fill=\"%23FFD700\" width=\"100\" height=\"1\"/></svg>')",
      }} />

      {/* Mouse Glow Effect */}
      <motion.div
        className="fixed w-96 h-96 bg-gradient-to-r from-amber-400/30 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{ x: mousePosition.x - 192, y: mousePosition.y - 192 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-amber-500/20" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl font-black tracking-wider"
          >
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              WAOJE
            </span>
            <span className="text-white"> Dubai</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -3, color: "#FFD700" }}
                className="text-sm font-semibold text-gray-300 hover:text-amber-400 transition-colors relative group"
              >
                {link.name}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-amber-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-b border-amber-500/20"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-300 hover:text-amber-400 font-semibold transition-colors"
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Cubes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 border-2 border-amber-500/20 rounded-lg"
              initial={{ opacity: 0, rotateX: -30, rotateY: -30 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                rotateX: [0, 180, 360],
                rotateY: [0, 180, 360],
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>

        {/* Gold Accent Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#FFD700" strokeWidth="1" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#FFD700" strokeWidth="1" />
          <circle cx="50%" cy="50%" r="30%" fill="none" stroke="#FFD700" strokeWidth="1" />
        </svg>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="mb-6 flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="p-4 border-2 border-amber-400 rounded-full"
              >
                <Sparkles className="w-8 h-8 text-amber-400" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              グローバル
            </span>
            <br />
            <span className="text-white">起業家ネットワーク</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              ドバイ版
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
          >
            中東の中心地で新しいビジネスチャンスを創造する日本の起業家コミュニティ。
            <br />
            グローバルな視点とローカルな深さで、ドバイのエコシステムに参画します。
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(251, 146, 60, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-black text-lg rounded-full hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
            >
              入会する
              <ChevronDown className="group-hover:translate-y-1 transition-transform" size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(96, 165, 250, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 border-2 border-blue-400 text-blue-300 font-black text-lg rounded-full hover:bg-blue-400/10 transition-all"
            >
              詳細を見る
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-amber-400 text-sm font-semibold">スクロール</div>
            <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="w-1 h-2 bg-amber-400 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative h-80 bg-gradient-to-br from-amber-500/20 to-blue-500/20 rounded-2xl overflow-hidden border border-amber-500/30">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-transparent"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-24 h-24 text-amber-400 opacity-20" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                  WAOJE
                </span>
                <br />
                について
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                WAOJEは、海外を拠点に活躍する日本人起業家のグローバルネットワークです。
                <br />
                <br />
                2004年にホンコンで始まったコミュニティは、現在世界中の20以上の都市に拡大。
                <br />
                <br />
                ドバイ支部では、中東の経済成長を背景に、新たなビジネスチャンスと
                パートナーシップを創造しています。
              </p>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-amber-400 font-bold text-lg cursor-pointer"
              >
                さらに詳しく →
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="relative py-32 px-6 bg-gradient-to-b from-transparent via-amber-950/10 to-transparent overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-16 text-center"
          >
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              主なイベント
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Global Venture Forum", date: "年1回開催", desc: "世界中のWAOJEメンバーが集う最大規模のネットワーキングイベント" },
              { title: "月例ミートアップ", date: "毎月開催", desc: "ドバイ拠点のメンバーによる定期的なビジネスミーティングと交流" },
              { title: "ビジネスパートナーシップ会", date: "随時開催", desc: "新しいビジネスチャンスとパートナーシップの創造の場" },
            ].map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(251, 146, 60, 0.2)" }}
                className="bg-gradient-to-br from-amber-500/10 to-blue-500/10 border border-amber-500/30 rounded-2xl p-8 hover:border-amber-400/60 transition-all group"
              >
                <div className="mb-4 h-1 w-12 bg-gradient-to-r from-amber-400 to-amber-500 group-hover:w-full transition-all duration-500 rounded-full" />
                <h3 className="text-2xl font-black mb-2 text-white group-hover:text-amber-400 transition-colors">
                  {event.title}
                </h3>
                <p className="text-amber-400 font-bold mb-3">{event.date}</p>
                <p className="text-gray-300 leading-relaxed">{event.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section id="members" className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-16 text-center"
          >
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
              メンバー
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="aspect-square rounded-xl bg-gradient-to-br from-amber-500/20 to-blue-500/20 border border-amber-500/30 flex items-center justify-center group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-transparent group-hover:from-amber-400/10 transition-all" />
                <div className="relative text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl font-black text-black">{i + 1}</span>
                  </div>
                  <p className="text-sm text-gray-400">[メンバー{i + 1}]</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 bg-gradient-to-b from-transparent to-amber-950/20 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                参加・お問い合わせ
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              WAOJEドバイコミュニティへのご参加やご質問は、
              <br />
              お気軽にお問い合わせください。
            </p>

            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 50px rgba(96, 165, 250, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-14 py-5 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-black text-lg rounded-full hover:shadow-2xl transition-all"
            >
              お問い合わせフォーム
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-500/20 bg-black/80 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-400 text-sm">
            © 2026 WAOJE Dubai. All rights reserved.
          </div>
          <div className="flex gap-8">
            {["Facebook", "LinkedIn", "Instagram"].map((social) => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ color: "#FFD700" }}
                className="text-gray-400 text-sm font-semibold"
              >
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
