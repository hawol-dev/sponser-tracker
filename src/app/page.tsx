"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { AnimatedCounter, PercentageCounter, PlusCounter } from "@/components/landing/animated-counter";
import { TiltCard } from "@/components/landing/tilt-card";
import { AnimatedText, FadeIn } from "@/components/landing/animated-text";
import { FAQAccordion } from "@/components/landing/faq-accordion";
import { ScrollProgress } from "@/components/landing/scroll-progress";
import { Menu, X, ArrowRight, Sparkles, LayoutDashboard, Bell, TrendingUp, Users, Video, Shield, UserPlus, Edit3, Kanban, Check } from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="min-h-screen bg-[#09090b] overflow-hidden">
      <ScrollProgress />

      {/* Background layers */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-500/[0.07] rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.07, 0.1, 0.07],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl z-50"
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-sm font-bold"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              S
            </motion.div>
            <span className="font-semibold text-white">Sponsor Tracker</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {["features", "how-it-works", "pricing", "faq"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className="text-white/60 hover:text-white transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                {item === "features" && "기능"}
                {item === "how-it-works" && "사용법"}
                {item === "pricing" && "요금제"}
                {item === "faq" && "FAQ"}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/[0.06]">
                  로그인
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/signup">
                <Button size="sm" className="group">
                  무료 시작
                  <motion.span
                    className="ml-1"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden bg-[#09090b]/95 border-t border-white/[0.06]"
        >
          <div className="container mx-auto px-6 py-4 space-y-4">
            {["features", "how-it-works", "pricing", "faq"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="block text-white/60 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item === "features" && "기능"}
                {item === "how-it-works" && "사용법"}
                {item === "pricing" && "요금제"}
                {item === "faq" && "FAQ"}
              </a>
            ))}
            <div className="flex gap-3 pt-4">
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full">로그인</Button>
              </Link>
              <Link href="/signup" className="flex-1">
                <Button className="w-full">무료 시작</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="container mx-auto max-w-6xl"
        >
          <div className="text-center">
            {/* Badge */}
            <FadeIn delay={0.2}>
              <motion.div
                className="inline-flex items-center gap-2 bg-violet-500/10 text-violet-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-violet-500/20"
                whileHover={{ scale: 1.05 }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(139, 92, 246, 0)",
                    "0 0 20px 5px rgba(139, 92, 246, 0.2)",
                    "0 0 0 0 rgba(139, 92, 246, 0)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity },
                }}
              >
                <Sparkles className="w-4 h-4" />
                크리에이터를 위한 스폰서십 관리
              </motion.div>
            </FadeIn>

            {/* Main Headline */}
            <FadeIn delay={0.3}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
                <AnimatedText animationType="words" className="inline">
                  협찬 관리,
                </AnimatedText>
                <br />
                <motion.span
                  className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent inline-block"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  더 이상 복잡하지 않게
                </motion.span>
              </h1>
            </FadeIn>

            {/* Subheadline */}
            <FadeIn delay={0.4}>
              <p className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
                피칭부터 결제까지, 모든 스폰서십을 한 곳에서.
                <br className="hidden sm:block" />
                칸반보드로 진행 상황을 시각화하고 수익을 분석하세요.
              </p>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
                <Link href="/signup">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button size="lg" className="text-base px-8 h-12 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all group relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        무료로 시작하기
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                        style={{ opacity: 0.3 }}
                      />
                    </Button>
                  </motion.div>
                </Link>
                <a href="#how-it-works">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="outline" size="lg" className="text-base px-8 h-12">
                      어떻게 작동하나요?
                    </Button>
                  </motion.div>
                </a>
              </div>
              <p className="text-sm text-white/30">카드 없이 무료로 시작</p>
            </FadeIn>
          </div>

          {/* Product Preview */}
          <FadeIn delay={0.6} className="mt-20">
            <TiltCard className="relative" tiltIntensity={5}>
              {/* Glow effect */}
              <div className="absolute -inset-10 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-3xl opacity-50" />

              <div className="relative rounded-2xl border border-white/[0.1] bg-[#0c0c0f] shadow-2xl overflow-hidden">
                {/* Browser chrome */}
                <div className="bg-[#16161a] px-4 py-3 flex items-center gap-3 border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-[#ff5f57]"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div
                      className="w-3 h-3 rounded-full bg-[#febc2e]"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div
                      className="w-3 h-3 rounded-full bg-[#28c840]"
                      whileHover={{ scale: 1.2 }}
                    />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-white/[0.05] text-xs text-white/40">
                      <Shield className="w-3 h-3" />
                      app.sponsortracker.io
                    </div>
                  </div>
                </div>

                {/* Dashboard UI */}
                <div className="p-6 bg-gradient-to-b from-[#0c0c0f] to-[#0f0f13]">
                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "이번 달 수익", value: "₩4,500,000", change: "+23%" },
                      { label: "진행 중", value: "8건", change: "" },
                      { label: "완료", value: "24건", change: "" },
                      { label: "협업 브랜드", value: "12개", change: "" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, borderColor: "rgba(139, 92, 246, 0.3)" }}
                      >
                        <p className="text-xs text-white/40 mb-1">{stat.label}</p>
                        <p className="text-lg font-semibold text-white flex items-center gap-2">
                          {stat.value}
                          {stat.change && (
                            <span className="text-xs text-emerald-400">{stat.change}</span>
                          )}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Kanban preview */}
                  <div className="grid grid-cols-6 gap-3">
                    {[
                      { name: "피칭", color: "#71717a", count: 3 },
                      { name: "협상 중", color: "#f59e0b", count: 2 },
                      { name: "계약", color: "#3b82f6", count: 2 },
                      { name: "제작 중", color: "#8b5cf6", count: 1 },
                      { name: "게시", color: "#10b981", count: 1 },
                      { name: "결제", color: "#14b8a6", count: 0 },
                    ].map((col, colIndex) => (
                      <div key={col.name} className="space-y-2">
                        <div className="flex items-center gap-2 px-2 py-1.5">
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: col.color }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: colIndex * 0.2 }}
                          />
                          <span className="text-xs font-medium text-white/60">{col.name}</span>
                          <span className="text-xs text-white/30">{col.count}</span>
                        </div>
                        <div className="space-y-2 min-h-[120px]">
                          {[...Array(col.count)].map((_, j) => (
                            <motion.div
                              key={j}
                              className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.06]"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: colIndex * 0.05 + j * 0.05 }}
                              whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.1)" }}
                            >
                              <div className="h-2 bg-white/10 rounded w-4/5 mb-2" />
                              <div className="h-1.5 bg-white/5 rounded w-3/5" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </FadeIn>
        </motion.div>
      </section>

      {/* Trust indicators with animated counters */}
      <section className="py-16 px-6 border-y border-white/[0.06]">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 200000000, prefix: "₩", suffix: "+", label: "관리된 협찬 금액", type: "currency" },
              { value: 500, suffix: "+", label: "크리에이터", type: "number" },
              { value: 1200, suffix: "+", label: "완료된 딜", type: "number" },
              { value: 99, suffix: "%", label: "고객 만족도", type: "percent" },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.type === "currency" && (
                      <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                    )}
                    {stat.type === "number" && (
                      <PlusCounter value={stat.value} />
                    )}
                    {stat.type === "percent" && (
                      <PercentageCounter value={stat.value} />
                    )}
                  </p>
                  <p className="text-sm text-white/40">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              아직도 이렇게 관리하고 계신가요?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-white/50 mb-12">
              많은 크리에이터들이 겪는 문제입니다
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📊", title: "엑셀 스프레드시트", desc: "복잡한 수식과 끝없는 시트 탭" },
              { icon: "📝", title: "메모장과 노션", desc: "흩어진 정보, 놓치는 마감일" },
              { icon: "💬", title: "카톡 대화창 검색", desc: "\"그 브랜드 담당자 이름이 뭐였지?\"" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  className="p-6 rounded-xl bg-red-500/5 border border-red-500/10 cursor-pointer"
                  whileHover={{
                    x: [0, -5, 5, -5, 5, 0],
                    borderColor: "rgba(239, 68, 68, 0.3)",
                    boxShadow: "0 0 30px rgba(239, 68, 68, 0.1)",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-sm font-medium text-violet-400 mb-3">FEATURES</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                스폰서십 관리의 모든 것
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                크리에이터에게 필요한 기능만 담았습니다
              </p>
            </ScrollReveal>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Large card - Kanban */}
            <ScrollReveal className="md:col-span-2 md:row-span-2">
              <motion.div
                className="h-full group relative rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 p-8 overflow-hidden"
                whileHover={{ borderColor: "rgba(139, 92, 246, 0.4)" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div
                    className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <LayoutDashboard className="w-6 h-6 text-violet-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">칸반 보드</h3>
                  <p className="text-white/60 mb-8 max-w-md">
                    피칭, 협상, 계약, 제작, 게시, 결제까지.
                    드래그 앤 드롭으로 딜 상태를 관리하세요.
                  </p>

                  {/* Mini kanban preview */}
                  <div className="grid grid-cols-4 gap-2">
                    {["협상 중", "계약", "제작 중", "결제"].map((name, i) => (
                      <motion.div
                        key={i}
                        className="bg-white/[0.03] rounded-lg p-2 border border-white/[0.06]"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="text-[10px] text-white/40 mb-2">{name}</div>
                        {[...Array(2 - Math.floor(i / 2))].map((_, j) => (
                          <motion.div
                            key={j}
                            className="bg-white/[0.05] rounded p-2 mb-1.5 last:mb-0"
                            whileHover={{ x: 2 }}
                          >
                            <div className="h-1.5 bg-white/10 rounded w-full mb-1" />
                            <div className="h-1 bg-white/5 rounded w-2/3" />
                          </motion.div>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Medium cards */}
            {[
              { icon: Bell, title: "마감일 알림", desc: "중요한 마감일 3일 전 이메일로 알려드려요", color: "amber" },
              { icon: TrendingUp, title: "수익 분석", desc: "월별, 브랜드별 수익을 차트로 한눈에", color: "emerald" },
              { icon: Users, title: "브랜드 CRM", desc: "담당자 연락처와 협업 히스토리 관리", color: "blue" },
              { icon: Video, title: "콘텐츠 타입", desc: "유튜브, 인스타, 블로그 등 구분 관리", color: "pink" },
              { icon: Shield, title: "안전한 데이터", desc: "모든 데이터 암호화 저장", color: "cyan" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  className={`group relative rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 h-full`}
                  whileHover={{
                    borderColor: `var(--${item.color})`,
                    boxShadow: `0 0 30px var(--${item.color}-glow)`,
                  }}
                  style={{
                    "--amber": "rgba(245, 158, 11, 0.3)",
                    "--amber-glow": "rgba(245, 158, 11, 0.1)",
                    "--emerald": "rgba(16, 185, 129, 0.3)",
                    "--emerald-glow": "rgba(16, 185, 129, 0.1)",
                    "--blue": "rgba(59, 130, 246, 0.3)",
                    "--blue-glow": "rgba(59, 130, 246, 0.1)",
                    "--pink": "rgba(236, 72, 153, 0.3)",
                    "--pink-glow": "rgba(236, 72, 153, 0.1)",
                    "--cyan": "rgba(6, 182, 212, 0.3)",
                    "--cyan-glow": "rgba(6, 182, 212, 0.1)",
                  } as React.CSSProperties}
                >
                  <motion.div
                    className={`w-10 h-10 bg-${item.color}-500/15 rounded-lg flex items-center justify-center mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-white/[0.01]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-sm font-medium text-violet-400 mb-3">HOW IT WORKS</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                3단계로 시작하세요
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "무료 가입",
                desc: "이메일 또는 구글 계정으로 30초 만에 가입하세요",
                icon: UserPlus,
              },
              {
                step: "02",
                title: "브랜드 & 딜 등록",
                desc: "협업 브랜드와 진행 중인 딜을 등록하세요",
                icon: Edit3,
              },
              {
                step: "03",
                title: "칸반으로 관리",
                desc: "드래그 앤 드롭으로 딜 상태를 업데이트하세요",
                icon: Kanban,
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="relative">
                  {i < 2 && (
                    <motion.div
                      className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-violet-500/50 to-transparent -translate-x-8"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + 0.5, duration: 0.5 }}
                      style={{ originX: 0 }}
                    />
                  )}
                  <div className="text-center">
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 mb-6 text-violet-400"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileInView={{
                        boxShadow: [
                          "0 0 0 0 rgba(139, 92, 246, 0)",
                          "0 0 30px 10px rgba(139, 92, 246, 0.2)",
                          "0 0 0 0 rgba(139, 92, 246, 0)",
                        ],
                      }}
                      transition={{
                        boxShadow: { duration: 2, repeat: Infinity, delay: i * 0.3 },
                      }}
                    >
                      <item.icon className="w-7 h-7" />
                    </motion.div>
                    <div className="text-xs font-bold text-violet-400 mb-2">{item.step}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/50">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-sm font-medium text-violet-400 mb-3">PRICING</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                심플한 요금제
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-white/50">
                무료로 시작하고, 필요할 때 업그레이드하세요
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free */}
            <ScrollReveal>
              <motion.div
                className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-8 h-full"
                whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">Free</h3>
                <p className="text-sm text-white/50 mb-6">개인 크리에이터에게 적합</p>
                <div className="text-4xl font-bold text-white mb-6">
                  ₩0<span className="text-lg font-normal text-white/50">/월</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {["딜 10개까지", "브랜드 5개까지", "칸반 보드", "기본 분석"].map((feature) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-white/70"
                      whileHover={{ x: 5 }}
                    >
                      <Check className="w-4 h-4 text-violet-400" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button variant="outline" className="w-full">무료로 시작</Button>
                </Link>
              </motion.div>
            </ScrollReveal>

            {/* Pro */}
            <ScrollReveal delay={0.1}>
              <motion.div
                className="relative rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/30 p-8 h-full"
                whileHover={{ borderColor: "rgba(139, 92, 246, 0.5)" }}
              >
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full text-xs font-medium text-white"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  추천
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">Pro</h3>
                <p className="text-sm text-white/50 mb-6">본격적인 크리에이터를 위해</p>
                <div className="text-4xl font-bold text-white mb-6">
                  ₩9,900<span className="text-lg font-normal text-white/50">/월</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {["딜 무제한", "브랜드 무제한", "마감일 이메일 알림", "상세 수익 분석", "데이터 내보내기", "우선 지원"].map((feature) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-white/70"
                      whileHover={{ x: 5 }}
                    >
                      <Check className="w-4 h-4 text-violet-400" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button className="w-full">Pro 시작하기</Button>
                </Link>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-white/[0.01]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-sm font-medium text-violet-400 mb-3">FAQ</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                자주 묻는 질문
              </h2>
            </ScrollReveal>
          </div>

          <FAQAccordion
            items={[
              {
                question: "무료로 사용할 수 있나요?",
                answer: "네! Free 플랜으로 딜 10개, 브랜드 5개까지 무료로 사용하실 수 있습니다. 신용카드 없이 바로 시작하세요.",
              },
              {
                question: "내 데이터는 안전한가요?",
                answer: "모든 데이터는 암호화되어 저장되며, 업계 표준 보안 프로토콜을 따릅니다. 데이터는 언제든 내보낼 수 있습니다.",
              },
              {
                question: "어떤 플랫폼을 지원하나요?",
                answer: "유튜브, 인스타그램, 블로그, 틱톡 등 모든 콘텐츠 플랫폼의 스폰서십을 관리할 수 있습니다.",
              },
              {
                question: "환불 정책은 어떻게 되나요?",
                answer: "구매 후 14일 이내 요청 시 전액 환불해드립니다. 만족하지 않으시면 언제든 환불 요청하세요.",
              },
              {
                question: "팀으로 사용할 수 있나요?",
                answer: "현재는 개인 사용자를 위한 서비스입니다. 팀/에이전시 기능은 추후 업데이트 예정입니다.",
              },
            ]}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <motion.div
              className="relative rounded-3xl bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-indigo-500/20 border border-violet-500/20 p-12 md:p-16 text-center overflow-hidden"
              whileHover={{ borderColor: "rgba(139, 92, 246, 0.4)" }}
            >
              {/* Background effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(139,92,246,0.15), transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  스폰서십 관리,<br />지금 시작하세요
                </motion.h2>
                <motion.p
                  className="text-lg text-white/60 mb-8 max-w-xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  더 이상 엑셀과 메모장에서 시간 낭비하지 마세요.
                  지금 무료로 시작하세요.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Link href="/signup">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" className="text-base px-10 h-14 shadow-xl shadow-violet-500/30">
                        무료로 시작하기
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div
              className="flex items-center gap-2.5"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-sm font-bold">
                S
              </div>
              <span className="font-semibold text-white">Sponsor Tracker</span>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
              {[
                { href: "/privacy", label: "개인정보처리방침" },
                { href: "/terms", label: "이용약관" },
                { href: "/refund", label: "환불정책" },
                { href: "mailto:support@sponsortracker.app", label: "문의하기" },
              ].map((link) => (
                <motion.div key={link.href} whileHover={{ y: -2 }}>
                  <Link href={link.href} className="hover:text-white/80 transition-colors">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/[0.06] text-center text-sm text-white/30">
            <p>&copy; 2025 Sponsor Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
