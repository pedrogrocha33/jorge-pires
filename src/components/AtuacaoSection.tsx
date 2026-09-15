import { motion } from "framer-motion";
import { FC } from "react";

// ÍCONES ABSTRATOS E GEOMÉTRICOS NO ESTILO DO MONOGRAMA JP
// Linhas puras tipo blueprint arquitetônico (stroke 1.5px em viewBox 80x80), sem preenchimento, minimalismo absoluto.

// 1. PREVENTIVO E ASSESSORIA CONTÍNUA: Arco concêntrico ~270° com eixo vertical (órbita/resguardo)
const PreventivoIcon: FC<{ className?: string }> = ({ className = "w-11 h-11 text-[#B87A58]" }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Arco incompleto de ~270° */}
    <path d="M 58.3 21.7 A 26 26 0 1 1 21.7 21.7" />
    {/* Eixo vertical central atravessando a órbita */}
    <path d="M 40 10 V 70" />
    {/* Traço horizontal sutil marcando a simetria */}
    <path d="M 28 40 H 52" />
  </svg>
);

// 2. SINDICÂNCIA E PROCESSOS ÉTICOS (PEP): Linhas paralelas assimétricas e eixo central (equilíbrio abstrato)
const SindicanciaIcon: FC<{ className?: string }> = ({ className = "w-11 h-11 text-[#B87A58]" }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Traço horizontal superior */}
    <path d="M 22 28 H 58" />
    {/* Traço horizontal inferior estendido */}
    <path d="M 14 52 H 66" />
    {/* Eixo vertical unificador */}
    <path d="M 40 16 V 64" />
    {/* Terminais de ancoragem */}
    <path d="M 22 24 V 28" />
    <path d="M 58 24 V 28" />
  </svg>
);

// 3. PROCESSOS JUDICIAIS: Vetor diagonal ascendente e estrutura angular (progressão técnica)
const JudiciaisIcon: FC<{ className?: string }> = ({ className = "w-11 h-11 text-[#B87A58]" }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Vetor diagonal de progressão */}
    <path d="M 18 62 L 58 22" />
    {/* Ângulo reto superior de direção */}
    <path d="M 38 22 H 58 V 42" />
    {/* Linha horizontal de apoio de base */}
    <path d="M 22 62 H 64" />
  </svg>
);

interface FrenteAtuacao {
  id: string;
  numero: string;
  titulo: string;
  descricao: string;
  itens: string[];
  IconComponent: FC<{ className?: string }>;
}

const frentesData: FrenteAtuacao[] = [
  {
    id: "preventivo",
    numero: "01",
    titulo: "PREVENTIVO E ASSESSORIA CONTÍNUA",
    descricao:
      "Assessoria jurídica disponível 24 horas, com elaboração e revisão de documentos médicos, contratos, regularização sanitária e treinamento de equipes — atuando antes que o risco se torne processo.",
    itens: [
      "Elaboração de documentos médicos",
      "Revisão de contratos",
      "Regularização sanitária",
      "Treinamento de colaboradores",
      "Pareceres técnicos",
    ],
    IconComponent: PreventivoIcon,
  },
  {
    id: "sindicancia",
    numero: "02",
    titulo: "SINDICÂNCIA E PROCESSOS ÉTICOS (PEP)",
    descricao:
      "Defesa técnica em sindicâncias e processos ético-disciplinares perante os Conselhos, com atuação estratégica desde a fase preliminar até recursos ao CFM.",
    itens: [
      "Defesa em sindicância",
      "Defesa em processos éticos disciplinares",
      "Recursos ao CFM",
      "Respostas a denúncias",
    ],
    IconComponent: SindicanciaIcon,
  },
  {
    id: "judiciais",
    numero: "03",
    titulo: "PROCESSOS JUDICIAIS",
    descricao:
      "Defesa técnica especializada em ações judiciais por suposto erro médico, com foco na absolvição do profissional em todas as instâncias.",
    itens: [
      "Defesa em ações por erro médico",
      "Acompanhamento integral do processo",
      "Recursos em instâncias superiores",
    ],
    IconComponent: JudiciaisIcon,
  },
];

export function AtuacaoSection() {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="atuacao"
      aria-label="Áreas de Atuação e Especialidades"
      className="relative min-h-screen w-full overflow-hidden bg-[#1B2B42] text-[#FEFEFE] py-24 md:py-36 lg:py-44 px-6 sm:px-12 md:px-16 xl:px-28 border-t border-[#B87A58]/10"
    >
      {/* Ambient Radial Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 30% 70%, rgba(13,21,32,0.85) 0%, rgba(27,43,66,0.6) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col items-start max-w-3xl">
          
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
              — ATUAÇÃO
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.12] tracking-[-0.01em] text-[#FEFEFE]"
            style={{ fontFamily: '"Lora", ui-serif, Georgia, serif' }}
          >
            Três frentes. Uma única missão: proteger.
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="mt-4 font-sans text-sm md:text-base leading-[1.7] text-[#FEFEFE]/65 font-normal max-w-2xl"
          >
            Da prevenção silenciosa à defesa técnica nas instâncias mais altas.
          </motion.p>
        </div>

        {/* Grid de 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mt-16 md:mt-20">
          {frentesData.map((frente, index) => {
            const Icon = frente.IconComponent;
            return (
              <motion.div
                key={frente.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, ease, delay: index * 0.15 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-sm bg-[#0D1520]/85 backdrop-blur-md border border-[#FEFEFE]/10 p-8 sm:p-10 transition-all duration-500 hover:border-[#B87A58]/50 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(184,122,88,0.12)]"
              >
                {/* Overlay Radial Cobre no Hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#B87A58]/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />

                {/* Topo do Card: Numeração Discreta + Ícone Abstrato de Assinatura */}
                <div className="relative z-10 flex items-center justify-between">
                  {/* Índice Numérico Discreto (01 //) */}
                  <span className="font-sans text-[11px] font-medium tracking-[0.25em] text-[#FEFEFE]/40 uppercase">
                    {frente.numero} //
                  </span>

                  {/* ÍCONE ABSTRATO GEOMÉTRICO (SELO DE MARCA D'ÁGUA) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease, delay: index * 0.15 + 0.15 }}
                    className="text-[#B87A58] opacity-75 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-0.5"
                  >
                    <Icon className="w-10 h-10 md:w-11 md:h-11 text-[#B87A58]" />
                  </motion.div>
                </div>

                {/* Conteúdo do Card */}
                <div className="relative z-10 pt-6">
                  {/* Título */}
                  <h3
                    className="text-xl md:text-2xl font-normal text-[#FEFEFE] tracking-tight leading-snug min-h-[3.25rem] flex items-end"
                    style={{ fontFamily: '"Lora", ui-serif, Georgia, serif' }}
                  >
                    {frente.titulo}
                  </h3>

                  {/* Descrição */}
                  <p className="mt-4 font-sans text-xs sm:text-sm text-[#FEFEFE]/70 leading-relaxed font-normal">
                    {frente.descricao}
                  </p>

                  {/* Linha Divisória Cobre */}
                  <div className="my-6 h-px w-12 bg-[#B87A58]/40 transition-all duration-500 group-hover:w-20 group-hover:bg-[#B87A58]" />

                  {/* Lista de Itens com Traço Cobre */}
                  <ul className="flex flex-col gap-3">
                    {frente.itens.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="h-px w-3 bg-[#B87A58] shrink-0" />
                        <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.15em] text-[#FEFEFE]/60">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rodapé do Card com Link Animado */}
                <div className="relative z-10 pt-8 mt-6 border-t border-[#FEFEFE]/5">
                  <a
                    href="#agendar"
                    aria-label={`Saiba mais sobre ${frente.titulo}`}
                    className="group/link inline-flex flex-col"
                  >
                    <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-[#FEFEFE] transition-colors duration-300 group-hover/link:text-[#B87A58]">
                      SAIBA MAIS &rarr;
                    </span>
                    <span className="mt-1 h-px w-full bg-[#B87A58]/30 overflow-hidden">
                      <span className="block h-full w-full bg-[#B87A58] transform -translate-x-full transition-transform duration-500 ease-out group-hover/link:translate-x-0" />
                    </span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
