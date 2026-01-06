"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  LayoutDashboard,
  Bell,
  TrendingUp,
  Users,
  FileText,
  Shield,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Send,
  Loader2,
} from "lucide-react";

// 목데이터
const mockDeals = {
  피칭: [
    { name: "삼성전자", desc: "갤럭시 Z폴드6 협찬" },
    { name: "쿠팡", desc: "쿠팡플레이 광고" },
    { name: "네이버", desc: "스마트스토어 홍보" },
  ],
  "협상 중": [
    { name: "LG전자", desc: "스탠바이미 리뷰" },
    { name: "배달의민족", desc: "앱 광고 캠페인" },
  ],
  계약: [
    { name: "카카오", desc: "카카오톡 이모티콘" },
    { name: "토스", desc: "토스뱅크 체험기" },
  ],
  "제작 중": [
    { name: "현대자동차", desc: "아이오닉6 시승기" },
  ],
  게시: [
    { name: "애플코리아", desc: "맥북프로 언박싱" },
  ],
  결제: [],
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [helpForm, setHelpForm] = useState({ name: "", email: "", message: "" });
  const [helpLoading, setHelpLoading] = useState(false);
  const [helpSuccess, setHelpSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background light effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/5 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Navigation */}
      <header>
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl" role="navigation" aria-label="메인 네비게이션">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-bold text-sm">
                S
              </div>
              <span className="font-medium text-white">Sponsor Tracker</span>
            </Link>

            {/* Desktop Nav - Center */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { href: "#features", label: "기능" },
                { href: "#pricing", label: "요금제" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA - Right */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Get Started
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-white/5 bg-black"
          >
            <div className="px-6 py-4 space-y-1">
              <a href="#features" className="block px-4 py-3 text-zinc-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                기능
              </a>
              <a href="#pricing" className="block px-4 py-3 text-zinc-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                요금제
              </a>
              <div className="pt-4 flex gap-3">
                <Link href="/login" className="flex-1">
                  <button className="w-full py-3 text-sm border border-white/10 rounded-lg hover:bg-white/5">
                    Log In
                  </button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <button className="w-full py-3 text-sm bg-white text-black rounded-lg">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
        </nav>
      </header>

      <main>
        {/* Hero Section - Left aligned */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              협찬 관리를
              <br />
              <span className="text-cyan-400">한 곳에서</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed"
            >
              피칭부터 결제까지, 모든 스폰서십 워크플로우를 관리하세요.
              더 이상 엑셀과 메모장에서 시간 낭비하지 마세요.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/signup">
                <button className="group px-6 py-3 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-all flex items-center gap-2 cursor-pointer">
                  Get Started
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <a href="#features">
                <button className="px-6 py-3 text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
                  기능 살펴보기
                  <ChevronRight className="w-4 h-4" />
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Demo Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-transparent rounded-3xl blur-2xl" />

              {/* Browser frame */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 rounded-md bg-zinc-800 text-xs text-zinc-500">
                      app.sponsortracker.io
                    </div>
                  </div>
                </div>

                {/* Dashboard mockup */}
                <div className="p-6 bg-zinc-950">
                  {/* Stats row */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "이번 달 수익", value: "₩4,500,000", badge: "+23%", badgeColor: "text-emerald-400" },
                      { label: "진행 중", value: "8건" },
                      { label: "완료", value: "24건" },
                      { label: "브랜드", value: "12개" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-zinc-900 rounded-xl p-4 border border-white/5">
                        <p className="text-xs text-zinc-500 mb-2">{stat.label}</p>
                        <p className="text-xl font-semibold text-white flex items-center gap-2">
                          {stat.value}
                          {stat.badge && <span className={`text-xs font-normal ${stat.badgeColor}`}>{stat.badge}</span>}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Kanban preview */}
                  <div className="grid grid-cols-6 gap-3">
                    {[
                      { name: "피칭", color: "#71717a" },
                      { name: "협상 중", color: "#f59e0b" },
                      { name: "계약", color: "#3b82f6" },
                      { name: "제작 중", color: "#8b5cf6" },
                      { name: "게시", color: "#10b981" },
                      { name: "결제", color: "#06b6d4" },
                    ].map((col) => (
                      <div key={col.name}>
                        <div className="flex items-center gap-2 px-2 py-2 mb-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                          <span className="text-xs font-medium text-zinc-400">{col.name}</span>
                        </div>
                        <div className="space-y-2 min-h-[80px]">
                          {mockDeals[col.name as keyof typeof mockDeals]?.map((deal, j) => (
                            <div key={j} className="bg-zinc-900 rounded-lg p-3 border border-white/5">
                              <p className="text-xs font-medium text-white mb-1">{deal.name}</p>
                              <p className="text-[10px] text-zinc-500 truncate">{deal.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section 1: Kanban - Left aligned */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                한눈에 보는
                <br />
                <span className="text-cyan-400">협찬 관리</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                드래그 앤 드롭으로 협찬 상태를 직관적으로 관리하세요.
                피칭부터 결제까지 모든 단계를 시각화합니다.
              </p>
              <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 text-sm font-medium cursor-pointer">
                시작하기 <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 rounded-xl p-6 border border-white/5"
            >
              {/* Mini kanban */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "협상 중", color: "#f59e0b" },
                  { name: "계약", color: "#3b82f6" },
                  { name: "제작 중", color: "#8b5cf6" },
                ].map((col) => (
                  <div key={col.name}>
                    <div className="flex items-center gap-2 px-2 py-2 mb-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                      <span className="text-xs font-medium text-zinc-400">{col.name}</span>
                    </div>
                    <div className="space-y-2">
                      {mockDeals[col.name as keyof typeof mockDeals]?.map((deal, j) => (
                        <div key={j} className="bg-zinc-800 rounded-lg p-3 border border-white/5">
                          <p className="text-xs font-medium text-white mb-1">{deal.name}</p>
                          <p className="text-[10px] text-zinc-500 truncate">{deal.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Analytics - Centered */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center mx-auto mb-8 border border-cyan-500/20">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Georgia, serif" }}>
              수익을 한눈에
              <br />
              파악하세요
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
              월별, 브랜드별 수익을 차트로 확인하세요.
              어떤 협찬이 가장 효과적인지 데이터로 알 수 있습니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900 rounded-xl p-6 border border-white/5"
          >
            {/* Analytics mockup */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <p className="text-xs text-zinc-500 mb-2">DELIVERABILITY</p>
                <p className="text-3xl font-bold text-white mb-1">98%</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-emerald-400">● Delivered</span>
                  <span className="text-zinc-500">3,204</span>
                </div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <p className="text-xs text-zinc-500 mb-2">ENGAGEMENT</p>
                <p className="text-3xl font-bold text-white mb-1">41%</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-cyan-400">● Opened</span>
                  <span className="text-zinc-500">1,312</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid - No cards, simple list */}
      <section id="features" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-16"
            style={{ fontFamily: "Georgia, serif" }}
          >
            필요한 모든 기능
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-12">
            {[
              { icon: LayoutDashboard, title: "칸반 보드", desc: "드래그 앤 드롭으로 협찬 상태를 직관적으로 관리" },
              { icon: Bell, title: "마감일 알림", desc: "중요한 마감일 3일 전 이메일로 알려드립니다" },
              { icon: TrendingUp, title: "수익 분석", desc: "월별, 브랜드별 수익을 차트로 한눈에" },
              { icon: Users, title: "브랜드 CRM", desc: "담당자 연락처와 협업 히스토리 관리" },
              { icon: FileText, title: "계약 관리", desc: "계약서와 관련 문서를 한 곳에서" },
              { icon: Shield, title: "데이터 보안", desc: "모든 데이터는 암호화되어 안전하게 저장" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <feature.icon className="w-5 h-5 text-zinc-500 mb-4" />
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
              심플한 요금제
            </h2>
            <p className="text-zinc-400">
              무료로 시작하고, 필요할 때 업그레이드하세요
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl border border-white/5 bg-zinc-950 flex flex-col"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
                <p className="text-sm text-zinc-500 mb-6">개인 크리에이터에게 적합</p>
                <div className="text-4xl font-bold text-white mb-8">
                  ₩0<span className="text-base font-normal text-zinc-500">/월</span>
                </div>
                <ul className="space-y-3">
                  {["협찬 10개까지", "브랜드 5개까지", "칸반 보드", "기본 분석"].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-zinc-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/signup" className="mt-8">
                <button className="w-full py-3 text-sm font-medium border border-white/10 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  무료로 시작
                </button>
              </Link>
            </motion.div>

            {/* Pro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative p-8 rounded-xl border-2 border-cyan-500/30 bg-gradient-to-b from-cyan-500/5 to-transparent flex flex-col"
            >
              <div className="absolute -top-3 left-6 px-3 py-1 bg-cyan-500 rounded-full text-xs font-medium text-black">
                추천
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
                <p className="text-sm text-zinc-500 mb-6">본격적인 크리에이터를 위해</p>
                <div className="text-4xl font-bold text-white mb-8">
                  ₩9,900<span className="text-base font-normal text-zinc-500">/월</span>
                </div>
                <ul className="space-y-3">
                  {["협찬 무제한", "브랜드 무제한", "마감일 이메일 알림", "상세 수익 분석", "데이터 내보내기", "우선 지원"].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/signup" className="mt-8">
                <button className="w-full py-3 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer">
                  Pro 시작하기
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            협찬 관리의 새로운 시작.
            <br />
            지금 바로.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-4 mt-8"
          >
            <Link href="/signup">
              <button className="group px-6 py-3 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-all flex items-center gap-2 cursor-pointer">
                Get Started
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <button
              onClick={() => setHelpModalOpen(true)}
              className="px-6 py-3 text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              Contact Us
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-16 px-6 overflow-hidden">
        {/* Background logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
          <span className="text-[20rem] font-bold tracking-tighter" style={{ fontFamily: "Georgia, serif" }}>
            S
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Logo & Address */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-bold text-sm">
                  S
                </div>
                <span className="font-medium text-white">Sponsor Tracker</span>
              </div>
              <p className="text-sm text-zinc-600">
                Seoul, South Korea
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-medium text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#features" className="hover:text-white transition-colors cursor-pointer">기능</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors cursor-pointer">요금제</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><Link href="/privacy" className="hover:text-white transition-colors cursor-pointer">개인정보처리방침</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors cursor-pointer">이용약관</Link></li>
                <li><Link href="/refund" className="hover:text-white transition-colors cursor-pointer">환불정책</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-white mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>
                  <button
                    onClick={() => setHelpModalOpen(true)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    문의하기
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 text-sm text-zinc-600">
            © 2025 Sponsor Tracker. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Help Modal */}
      <AnimatePresence>
        {helpModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setHelpModalOpen(false);
                setHelpSuccess(false);
                setHelpForm({ name: "", email: "", message: "" });
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
            >
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">문의하기</h3>
                  <button
                    onClick={() => {
                      setHelpModalOpen(false);
                      setHelpSuccess(false);
                      setHelpForm({ name: "", email: "", message: "" });
                    }}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {helpSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h4 className="text-white font-medium mb-2">메시지가 전송되었습니다</h4>
                    <p className="text-sm text-zinc-400">빠른 시일 내에 답변 드리겠습니다.</p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setHelpLoading(true);
                      try {
                        const res = await fetch("/api/contact", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(helpForm),
                        });
                        if (res.ok) {
                          setHelpSuccess(true);
                        }
                      } catch (err) {
                        console.error(err);
                      } finally {
                        setHelpLoading(false);
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">이름</label>
                      <input
                        type="text"
                        required
                        value={helpForm.name}
                        onChange={(e) => setHelpForm({ ...helpForm, name: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800 border border-white/5 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        placeholder="홍길동"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">이메일</label>
                      <input
                        type="email"
                        required
                        value={helpForm.email}
                        onChange={(e) => setHelpForm({ ...helpForm, email: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800 border border-white/5 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">메시지</label>
                      <textarea
                        required
                        rows={4}
                        value={helpForm.message}
                        onChange={(e) => setHelpForm({ ...helpForm, message: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800 border border-white/5 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                        placeholder="문의 내용을 입력하세요..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={helpLoading}
                      className="w-full py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {helpLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          보내기
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
