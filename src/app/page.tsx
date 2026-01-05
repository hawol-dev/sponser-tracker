"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ArrowRight,
  LayoutDashboard,
  Bell,
  TrendingUp,
  Users,
  Video,
  Shield,
  Check,
  ChevronDown,
  Play,
  Zap,
} from "lucide-react";

// Simple fade in animation component
function FadeInWhenVisible({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const navItems = [
    { href: "#features", label: "기능" },
    { href: "#how-it-works", label: "사용법" },
    { href: "#pricing", label: "요금제" },
    { href: "#faq", label: "FAQ" },
  ];

  const features = [
    {
      icon: LayoutDashboard,
      title: "칸반 보드",
      description: "드래그 앤 드롭으로 딜 상태를 직관적으로 관리하세요",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      icon: Bell,
      title: "마감일 알림",
      description: "중요한 마감일을 놓치지 않도록 알려드립니다",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: TrendingUp,
      title: "수익 분석",
      description: "월별, 브랜드별 수익을 차트로 한눈에 파악하세요",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: Users,
      title: "브랜드 CRM",
      description: "담당자 연락처와 협업 히스토리를 체계적으로 관리",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Video,
      title: "콘텐츠 관리",
      description: "유튜브, 인스타, 블로그 등 플랫폼별 구분 관리",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: Shield,
      title: "안전한 데이터",
      description: "모든 데이터는 암호화되어 안전하게 저장됩니다",
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "무료 가입",
      description: "이메일 또는 구글 계정으로 30초 만에 가입",
    },
    {
      number: "02",
      title: "브랜드 & 딜 등록",
      description: "협업 브랜드와 진행 중인 딜을 등록",
    },
    {
      number: "03",
      title: "칸반으로 관리",
      description: "드래그 앤 드롭으로 상태 업데이트",
    },
  ];

  const faqs = [
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
      answer: "구매 후 14일 이내 요청 시 전액 환불해드립니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0B]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="font-semibold text-white">Sponsor Tracker</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                  로그인
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-white text-black hover:bg-zinc-200">
                  무료 시작
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border-t border-white/5 bg-[#0A0A0B]"
          >
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-zinc-400 hover:text-white py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex gap-3 pt-4">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full">로그인</Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button className="w-full bg-white text-black hover:bg-zinc-200">무료 시작</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <FadeInWhenVisible className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
              <Zap className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-300">크리에이터를 위한 스폰서십 관리 플랫폼</span>
            </div>
          </FadeInWhenVisible>

          {/* Headline */}
          <FadeInWhenVisible delay={0.1} className="text-center mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
              협찬 관리를
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                더 스마트하게
              </span>
            </h1>
          </FadeInWhenVisible>

          {/* Subheadline */}
          <FadeInWhenVisible delay={0.2} className="text-center mb-10">
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              피칭부터 결제까지, 모든 스폰서십을 한 곳에서.
              <br className="hidden sm:block" />
              칸반보드로 진행 상황을 시각화하고 수익을 분석하세요.
            </p>
          </FadeInWhenVisible>

          {/* CTA Buttons */}
          <FadeInWhenVisible delay={0.3} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link href="/signup">
              <Button size="lg" className="text-base px-8 h-12 bg-white text-black hover:bg-zinc-200 group">
                무료로 시작하기
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 h-12 border-zinc-700 bg-transparent hover:bg-zinc-800 text-white"
              >
                <Play className="mr-2 w-4 h-4" />
                작동 방식 보기
              </Button>
            </a>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.4} className="text-center text-sm text-zinc-500">
            신용카드 없이 무료로 시작
          </FadeInWhenVisible>

          {/* Product Preview */}
          <FadeInWhenVisible delay={0.5} className="mt-16">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl blur-3xl" />

              {/* Browser frame */}
              <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/80 backdrop-blur">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 rounded-md bg-zinc-800 text-xs text-zinc-400">
                      app.sponsortracker.io
                    </div>
                  </div>
                </div>

                {/* Dashboard mockup */}
                <div className="p-6 bg-[#0c0c0e]">
                  {/* Stats row */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "이번 달 수익", value: "₩4,500,000", change: "+23%" },
                      { label: "진행 중인 딜", value: "8건" },
                      { label: "완료된 딜", value: "24건" },
                      { label: "협업 브랜드", value: "12개" },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50"
                      >
                        <p className="text-xs text-zinc-500 mb-1">{stat.label}</p>
                        <p className="text-lg font-semibold text-white flex items-center gap-2">
                          {stat.value}
                          {stat.change && (
                            <span className="text-xs text-emerald-400">{stat.change}</span>
                          )}
                        </p>
                      </div>
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
                    ].map((col) => (
                      <div key={col.name}>
                        <div className="flex items-center gap-2 px-2 py-2 mb-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: col.color }}
                          />
                          <span className="text-xs font-medium text-zinc-400">{col.name}</span>
                          <span className="text-xs text-zinc-600">{col.count}</span>
                        </div>
                        <div className="space-y-2 min-h-[100px]">
                          {[...Array(col.count)].map((_, j) => (
                            <div
                              key={j}
                              className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50"
                            >
                              <div className="h-2 bg-zinc-700 rounded w-4/5 mb-2" />
                              <div className="h-1.5 bg-zinc-700/50 rounded w-3/5" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "₩2억+", label: "관리된 협찬 금액" },
              { value: "500+", label: "크리에이터" },
              { value: "1,200+", label: "완료된 딜" },
              { value: "99%", label: "고객 만족도" },
            ].map((stat, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-zinc-500">{stat.label}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible className="text-center mb-16">
            <p className="text-sm font-medium text-violet-400 mb-4">FEATURES</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              필요한 기능만 담았습니다
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              복잡한 기능은 빼고, 크리에이터에게 정말 필요한 것만
            </p>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <FadeInWhenVisible className="text-center mb-16">
            <p className="text-sm font-medium text-violet-400 mb-4">HOW IT WORKS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              3단계로 시작하세요
            </h2>
          </FadeInWhenVisible>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-zinc-800 via-violet-500/30 to-zinc-800" />

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <FadeInWhenVisible key={i} delay={i * 0.15}>
                  <div className="text-center relative">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center mx-auto mb-6 relative z-10">
                      <span className="text-lg font-bold text-violet-400">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-zinc-400 text-sm">{step.description}</p>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInWhenVisible className="text-center mb-16">
            <p className="text-sm font-medium text-violet-400 mb-4">PRICING</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              심플한 요금제
            </h2>
            <p className="text-lg text-zinc-400">
              무료로 시작하고, 필요할 때 업그레이드하세요
            </p>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free */}
            <FadeInWhenVisible>
              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 h-full flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
                <p className="text-sm text-zinc-400 mb-6">개인 크리에이터에게 적합</p>
                <div className="text-4xl font-bold text-white mb-8">
                  ₩0<span className="text-base font-normal text-zinc-500">/월</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {["딜 10개까지", "브랜드 5개까지", "칸반 보드", "기본 분석"].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-violet-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button variant="outline" className="w-full h-12 border-zinc-700 bg-transparent hover:bg-zinc-800 text-white">
                    무료로 시작
                  </Button>
                </Link>
              </div>
            </FadeInWhenVisible>

            {/* Pro */}
            <FadeInWhenVisible delay={0.1}>
              <div className="relative p-8 rounded-2xl bg-gradient-to-b from-violet-500/10 to-transparent border-2 border-violet-500/30 h-full flex flex-col">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-500 rounded-full text-xs font-medium text-white">
                  추천
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
                <p className="text-sm text-zinc-400 mb-6">본격적인 크리에이터를 위해</p>
                <div className="text-4xl font-bold text-white mb-8">
                  ₩9,900<span className="text-base font-normal text-zinc-500">/월</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {["딜 무제한", "브랜드 무제한", "마감일 이메일 알림", "상세 수익 분석", "데이터 내보내기", "우선 지원"].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-violet-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button className="w-full h-12 bg-violet-500 hover:bg-violet-600 text-white">
                    Pro 시작하기
                  </Button>
                </Link>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-zinc-900/30">
        <div className="max-w-2xl mx-auto">
          <FadeInWhenVisible className="text-center mb-16">
            <p className="text-sm font-medium text-violet-400 mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              자주 묻는 질문
            </h2>
          </FadeInWhenVisible>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-zinc-400 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-sm text-zinc-400 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInWhenVisible>
            <div className="relative rounded-2xl overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTIgMGEyIDIgMCAxIDAgNCAwYTIgMiAwIDEgMC00IDB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-30" />

              <div className="relative px-8 py-16 md:py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  스폰서십 관리, 지금 시작하세요
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                  더 이상 엑셀과 메모장에서 시간 낭비하지 마세요.
                </p>
                <Link href="/signup">
                  <Button size="lg" className="text-base px-10 h-14 bg-white text-violet-600 hover:bg-zinc-100">
                    무료로 시작하기
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="font-semibold text-white">Sponsor Tracker</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
              <Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
              <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
              <Link href="/refund" className="hover:text-white transition-colors">환불정책</Link>
              <a href="mailto:support@sponsortracker.app" className="hover:text-white transition-colors">문의하기</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center text-sm text-zinc-600">
            <p>&copy; 2025 Sponsor Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
