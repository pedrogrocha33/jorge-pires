import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AboutSection } from "@/components/AboutSection";
import { AtuacaoSection } from "@/components/AtuacaoSection";
import { CustomCursor } from "@/components/CustomCursor";

export const Route = createFileRoute("/")({
  component: Hero,
});

function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const handleMouseMoveBtn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.25; // 25% magnet pull
    const distY = (e.clientY - centerY) * 0.25;
    setBtnOffset({ x: distX, y: distY });
  };

  const handleMouseLeaveBtn = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ease = [0.16, 1, 0.3, 1] as const;

  const navItems = [
    { label: "A Banca", href: "#banca" },
    { label: "Atuação", href: "#atuacao" },
    { label: "Tesouros Literários", href: "#publicacoes" },
  ];

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#0D1520] text-[#FEFEFE] font-sans antialiased">
      {/* Custom Cursor Flutuante de Estúdio */}
      <CustomCursor />

      {/* Ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 700px at 50% 45%, #1B2B42 0%, #0D1520 70%)",
        }}
      />

      {/* Header Responsivo (Ajuste 5) */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || mobileMenuOpen
            ? "backdrop-blur-md bg-[#1B2B42]/85 border-b border-[#B87A58]/15 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-16 xl:px-28">
          
          {/* Logo & Marca Oficial — Filtro de Alto Contraste Cobre Brilhante */}
          <a
            href="#hero"
            aria-label="Jorge Pires Advogados — início"
            className="flex items-center shrink-0"
          >
            <img
              src="/logo.png"
              alt="Jorge Pires Advogados"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-all duration-300"
              style={{
                filter: "brightness(0) saturate(100%) invert(62%) sepia(35%) saturate(850%) hue-rotate(346deg) brightness(120%) contrast(105%) drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
              }}
            />
          </a>

          {/* Navegação Desktop */}
          <nav aria-label="Navegação principal" className="hidden items-center gap-10 lg:gap-12 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans text-[10px] lg:text-[11px] font-medium uppercase tracking-[0.32em] text-[#FEFEFE]/70 transition-colors duration-500 hover:text-[#B87A58]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA "Sala Privada" Desktop com Glow Pulsante (Ajuste 3) */}
          <div className="hidden md:flex items-center">
            <motion.a
              href="#sala-privada"
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="group relative font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-[#FEFEFE]/90"
            >
              Sala Privada
              <span className="mt-1 block h-px w-full bg-[#B87A58] transition-all duration-500 group-hover:bg-[#B87A58]" />
            </motion.a>
          </div>

          {/* Hambúrguer Mobile (< 768px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none z-50 text-[#FEFEFE]"
          >
            <span
              className={`block w-6 h-0.5 bg-[#B87A58] transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#B87A58] transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#B87A58] transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Overlay / Drawer Mobile Expansível (Ajuste 5) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease }}
              className="md:hidden overflow-hidden bg-[#0D1520]/98 backdrop-blur-2xl border-b border-[#B87A58]/20 px-8 py-8 flex flex-col gap-6"
            >
              <div className="pb-4 border-b border-[#B87A58]/20 flex items-center justify-between">
                <img
                  src="/logo.png"
                  alt="Jorge Pires Advogados"
                  className="h-7 w-auto object-contain"
                  style={{
                    filter: "brightness(0) saturate(100%) invert(62%) sepia(35%) saturate(850%) hue-rotate(346deg) brightness(120%) contrast(105%)"
                  }}
                />
              </div>

              <nav className="flex flex-col gap-5 pt-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-[#FEFEFE]/80 hover:text-[#B87A58] transition-colors py-1"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#B87A58]/15 mt-2">
                <motion.a
                  href="#sala-privada"
                  onClick={() => setMobileMenuOpen(false)}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="block w-full text-center py-3.5 px-4 border border-[#B87A58] bg-[#B87A58]/10 text-xs font-medium uppercase tracking-[0.3em] text-[#FEFEFE] rounded-sm"
                >
                  Sala Privada &rarr;
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero */}
      <section
        ref={containerRef}
        id="hero"
        aria-label="Introdução Principal"
        className="relative flex min-h-dvh w-full flex-col justify-center pb-16 pt-32 md:pb-20 md:pt-40"
      >
        {/* Monumental portrait — right-anchored, full-height, bleeds to edge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease, delay: 0.4 }}
          className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[50%] lg:block"
        >
          <div className="relative h-full w-full overflow-hidden">
            <motion.img
              src="/foto-hero.PNG"
              alt="Jorge Pires, advogado de defesa médica, em ambiente executivo"
              loading="eager"
              fetchPriority="high"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease }}
              style={{ y: portraitY, scale: portraitScale }}
              className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
            />
            {/* Left-side fade into the deep blue */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to left, rgba(13,21,32,0) 0%, rgba(13,21,32,0.15) 30%, rgba(13,21,32,0.5) 60%, rgba(13,21,32,0.85) 85%, rgba(13,21,32,1) 100%)",
              }}
            />
            {/* Subtle top/bottom vignette to anchor scale */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(13,21,32,0.35) 0%, rgba(13,21,32,0) 20%, rgba(13,21,32,0) 80%, rgba(13,21,32,0.5) 100%)",
              }}
            />
          </div>
        </motion.div>

        {/* Text block — dominates left half, editorial scale */}
        <div className="relative z-10 w-full px-6 sm:px-12 md:px-24 xl:px-32">
          <div className="max-w-[46rem] lg:max-w-[38rem] xl:max-w-[44rem]">
            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl font-normal leading-[1.08] tracking-[-0.005em] text-[#FEFEFE] md:text-6xl lg:text-[5rem] xl:text-[5.75rem]"
              style={{ fontFamily: '"Lora", ui-serif, Georgia, serif' }}
            >
              {["Maestria", "Jurídica.", "Proteção", "Absoluta."].map((word, i) => (
                <span key={word} className="mr-[0.12em] inline-block overflow-hidden align-bottom">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, ease, delay: 0.9 + i * 0.12 }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 1.7 }}
              className="mt-8 md:mt-10 max-w-md font-sans text-base font-normal leading-relaxed text-[#F5EFEB]/80 md:text-lg"
              style={{ textShadow: "none", filter: "none" }}
            >
              Dedicamos nossa inteligência técnica à salvaguarda de sua reputação, liberdade e legado na medicina de alta performance. Um escudo invisível e implacável para quem salva vidas.
            </motion.p>

            {/* CTAs com Efeito de Botão Magnético */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 1.9 }}
              className="mt-10 md:mt-14"
            >
              <motion.a
                href="#agendar"
                aria-label="Agendar conselho privado"
                onMouseMove={handleMouseMoveBtn}
                onMouseLeave={handleMouseLeaveBtn}
                animate={{ x: btnOffset.x, y: btnOffset.y }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="group inline-flex items-center bg-transparent py-3.5 px-2 text-xs font-medium uppercase tracking-[0.3em] text-[#FEFEFE] border-b border-[#B87A58] transition-all duration-500 hover:tracking-[0.38em] hover:bg-[#B87A58]/10 shadow-studio-copper"
              >
                Agendar Conselho Privado
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Mobile portrait bg — CORREÇÃO 1: z-0 e gradiente suave para visibilidade total no mobile */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 lg:hidden overflow-hidden">
          <img
            src="/foto-hero.PNG"
            alt="Dr. Jorge Pires"
            className="h-full w-full object-cover object-[70%_25%] opacity-45 min-h-[60vh]"
          />
          {/* Overlay gradiente escuro garantindo contraste e legibilidade perfeita do texto */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(13,21,32,0.3) 0%, rgba(13,21,32,0.85) 60%, rgba(13,21,32,1) 100%)",
            }}
          />
        </div>
      </section>

      {/* Seção A Banca / Quem é o Dr. Jorge */}
      <AboutSection />

      {/* Seção Atuação / Especialidades */}
      <AtuacaoSection />
    </div>
  );
}
