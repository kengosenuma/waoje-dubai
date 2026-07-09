"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || "送信に失敗しました");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("通信エラーが発生しました");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 py-10 text-center"
      >
        <CheckCircle2 className="text-[#C9A227]" size={40} />
        <p className="text-lg font-bold">送信しました</p>
        <p className="text-gray-400 text-sm">お問い合わせありがとうございます。担当者よりご連絡いたします。</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-1.5">
          氏名 <span className="text-[#E4342A]">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C9A227] transition-colors"
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-1.5">
          メールアドレス <span className="text-[#E4342A]">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C9A227] transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-gray-300 mb-1.5">
          会社名
        </label>
        <input
          id="company"
          name="company"
          className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C9A227] transition-colors"
          placeholder="株式会社〇〇"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-1.5">
          お問い合わせ内容 <span className="text-[#E4342A]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C9A227] transition-colors resize-none"
          placeholder="ご質問・ご相談内容をご記入ください"
        />
      </div>

      {status === "error" && (
        <p className="text-[#E4342A] text-sm font-medium">{errorMsg}</p>
      )}

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
        whileTap={{ scale: status === "loading" ? 1 : 0.97 }}
        className="mt-2 px-8 py-3.5 bg-[#C9A227] text-black font-black rounded-full hover:shadow-[0_0_40px_rgba(201,162,39,0.4)] transition-shadow disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === "loading" && <Loader2 className="animate-spin" size={18} />}
        {status === "loading" ? "送信中..." : "送信する"}
      </motion.button>
    </form>
  );
}
