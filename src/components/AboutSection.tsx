import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  // Anima quando a seção atinge ~40% de visibilidade na viewport
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1200; // 1.2 segundos (easing suave)
      const steps = 40;
      const increment = value / steps;
      const stepTime = duration / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // AJUSTE 3: Parallax real na foto durante o scroll (~12% mais lento)
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 45]);
  const frameY = useTransform(scrollYProgress, [0, 1], [-45, 60]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={sectionRef}
      id="banca"
      aria-label="Quem é o Dr. Jorge"
      className="relative min-h-screen w-full overflow-hidden bg-[#1B2B42] text-[#FEFEFE] py-20 md:py-36 lg:py-44 px-6 sm:px-12 md:px-16 xl:px-28 border-t border-[#B87A58]/10"
    >
      {/* Ambient Radial Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 70% 30%, rgba(27,43,66,0.6) 0%, rgba(13,21,32,0.95) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-16 items-center">
          
          {/* COLUNA ESQUERDA: Imagem + Frame Cobre Sólido + Número 02 Fantasma */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            
            {/* CORREÇÃO 2: Número fantasma "02" em outline com opacidade de 20-25% no mobile para presença real */}
            <span
              aria-hidden
              className="select-none pointer-events-none absolute -top-16 -left-4 sm:-top-24 sm:-left-8 md:-top-36 md:-left-16 lg:-top-44 lg:-left-20 font-sans font-extrabold text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[25rem] xl:text-[28rem] leading-none text-transparent z-0 opacity-25 md:opacity-15"
              style={{
                WebkitTextStroke: "2px #B87A58",
              }}
            >
              02
            </span>

            {/* AJUSTE 2: Frame sólido cobre (1.5px em #B87A58 100% opacidade) com offset de 15px */}
            <motion.div
              style={{ y: frameY }}
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 md:translate-x-4 md:translate-y-4 border-[1.5px] border-[#B87A58] opacity-100 rounded-sm z-0 pointer-events-none"
            />

            {/* AJUSTE 2 & 3: Foto com Parallax real e Shadow multicamadas de estúdio */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease }}
              style={{ y: imageY }}
              className="relative z-10 w-full max-w-md lg:max-w-none overflow-hidden rounded-sm bg-[#0D1520] border border-[#B87A58]/20 shadow-studio-lg shadow-studio-copper"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                  src="/quem-e-o-dr.PNG"
                  alt="Dr. Jorge Pires em ambiente corporativo de advocacia médica"
                  className="h-full w-full object-cover object-[55%_center] transition-transform duration-700 hover:scale-105"
                />
                
                {/* Duotone / Overlay sutil para integração harmônica com #1B2B42 */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40 bg-[#1B2B42]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#1B2B42]/90 via-transparent to-[#1B2B42]/30"
                />
              </div>

              {/* Card de legenda da foto com glow pulsante sutil */}
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-[#0D1520]/85 border border-[#B87A58]/30 p-4 rounded-sm shadow-lg"
              >
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87A58]">
                  Dr. Jorge Pires
                </p>
                <p className="font-sans text-xs text-[#FEFEFE]/70 mt-0.5">
                  Advogado Especialista em Direito Médico e da Saúde
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* COLUNA DIREITA: Conteúdo Editorial e Estatísticas */}
          <div className="lg:col-span-7 flex flex-col justify-center pl-0 lg:pl-6">
            
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#B87A58]" />
              <span className="font-sans text-[10px] md:text-xs font-medium uppercase tracking-[0.35em] text-[#B87A58]">
                A BANCA
              </span>
            </motion.div>

            {/* Headline Oficial */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
              className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.12] tracking-[-0.01em] text-[#FEFEFE]"
              style={{ fontFamily: '"Lora", ui-serif, Georgia, serif' }}
            >
              Anos de dedicação técnica à honra e ao legado de quem cuida de vidas.
            </motion.h2>

            {/* Parágrafo de Trajetória Oficial */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              className="mt-6 font-sans text-sm md:text-base leading-[1.7] text-[#FEFEFE]/65 max-w-2xl font-normal"
            >
              Advogado especialista em Direito Médico e da Saúde, com mais de 9 anos de experiência dedicados ao ecossistema da medicina de alta performance. Atuação reconhecida como Vice-presidente da Comissão de Direito Médico da 27ª Subseção (2023-2024) e, atualmente, membro da Comissão de Direito Médico e da Saúde Estadual. Defensor dativo nomeado perante o CREMESP.
            </motion.p>

            {/* Linha Divisória Fina Cobre */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="mt-10 mb-10 h-px w-20 bg-[#B87A58]/60 origin-left"
            />

            {/* Bloco de Credenciais Reais Oficiais */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 md:gap-8 border-l border-[#B87A58]/20 pl-6 md:pl-8 py-2"
            >
              {/* Credencial 1 */}
              <div>
                <div
                  className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FEFEFE] tracking-tight"
                  style={{ fontFamily: '"Lora", ui-serif, Georgia, serif' }}
                >
                  <Counter value={9} suffix="+" />
                </div>
                <p className="mt-2 font-sans text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#FEFEFE]/60">
                  ANOS DE ATUAÇÃO EM DIREITO MÉDICO
                </p>
              </div>

              {/* Credencial 2 */}
              <div>
                <div
                  className="text-xl sm:text-xl lg:text-2xl font-normal text-[#FEFEFE] tracking-tight leading-tight min-h-[2.5rem] flex items-end"
                  style={{ fontFamily: '"Lora", ui-serif, Georgia, serif' }}
                >
                  EX-VICE-PRESIDENTE
                </div>
                <p className="mt-2 font-sans text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#FEFEFE]/60 leading-normal">
                  COMISSÃO DE DIREITO MÉDICO — 27ª SUBSEÇÃO (2023-2024)
                </p>
              </div>

              {/* Credencial 3 */}
              <div>
                <div
                  className="text-xl sm:text-xl lg:text-2xl font-normal text-[#FEFEFE] tracking-tight leading-tight min-h-[2.5rem] flex items-end"
                  style={{ fontFamily: '"Lora", ui-serif, Georgia, serif' }}
                >
                  DEFENSOR DATIVO
                </div>
                <p className="mt-2 font-sans text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#FEFEFE]/60 leading-normal">
                  NOMEADO PERANTE O CREMESP
                </p>
              </div>
            </motion.div>

            {/* CTA Discreto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
              className="mt-12"
            >
              <a
                href="#trajetoria"
                aria-label="Conheça a trajetória do Dr. Jorge"
                className="group relative inline-flex flex-col py-2"
              >
                <span className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-[#FEFEFE] transition-colors duration-300 group-hover:text-[#B87A58]">
                  CONHEÇA A TRAJETÓRIA &rarr;
                </span>
                <span className="mt-1.5 h-px w-full bg-[#B87A58]/30 overflow-hidden">
                  <span className="block h-full w-full bg-[#B87A58] transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
                </span>
              </a>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
