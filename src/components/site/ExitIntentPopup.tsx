"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const KEY = "exit_popup_shown_at";
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const shouldShow = useCallback(() => {
    if (typeof window === "undefined") return false;
    if (window.innerWidth < 1024) return false;
    const last = localStorage.getItem(KEY);
    if (!last) return true;
    return Date.now() - Number(last) > COOLDOWN_MS;
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && shouldShow()) {
        setIsOpen(true);
        localStorage.setItem(KEY, String(Date.now()));
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [shouldShow]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Введите email"); return; }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Аноним",
          email,
          message: "Exit intent запрос",
          source: "exit_intent",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Ошибка отправки. Попробуйте снова.");
      }
    } catch {
      setError("Ошибка отправки. Попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="glass-card rounded-2xl p-8 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {submitted ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">Готово!</h3>
                  <p className="text-gray-400 mb-4">Мы свяжемся с вами в ближайшее время</p>
                  <a
                    href="https://t.me/fullfocusdev_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 text-sm underline"
                  >
                    Написать нам в Telegram →
                  </a>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="text-3xl mb-3">👋</div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      Подождите! Специальное предложение
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Оставьте email и получите бесплатную консультацию по вашему проекту
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Ваше имя (необязательно)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none text-sm"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none text-sm"
                    />
                    {error && <p className="text-red-400 text-xs">{error}</p>}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-black font-bold rounded-lg transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Отправка..." : "Получить бесплатную консультацию"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-2 text-gray-500 hover:text-gray-300 text-sm transition-colors"
                    >
                      Нет, спасибо
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
