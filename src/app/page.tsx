"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  LayoutDashboard,
  Bell,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  Calendar,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradient effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-500/20 via-blue-500/5 to-transparent blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
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
                { href: "#how-it-works", label: "사용법" },
                { href: "#pricing", label: "요금제" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA - Right */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2.5 text-sm font-medium bg-white text-black rounded-full hover:bg-zinc-200 transition-colors"
              >
                시작하기
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
              {[
                { href: "#features", label: "기능" },
                { href: "#how-it-works", label: "사용법" },
                { href: "#pricing", label: "요금제" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 flex gap-3">
                <Link href="/login" className="flex-1">
                  <button className="w-full py-3 text-sm border border-white/10 rounded-full hover:bg-white/5">
                    로그인
                  </button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <button className="w-full py-3 text-sm bg-white text-black rounded-full hover:bg-zinc-200">
                    시작하기
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-zinc-300">크리에이터를 위한 스폰서십 관리</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            협찬 관리를
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              한 곳에서
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            피칭부터 결제까지, 모든 스폰서십 워크플로우를 관리하세요.
            <br className="hidden sm:block" />
            더 이상 엑셀과 메모장에서 시간 낭비하지 마세요.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/signup">
              <button className="group px-8 py-4 text-base font-medium bg-white text-black rounded-full hover:bg-zinc-200 transition-all flex items-center gap-2">
                무료로 시작하기
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="#features">
              <button className="px-8 py-4 text-base font-medium border-2 border-white/10 rounded-full hover:bg-white/5 hover:border-white/20 transition-all backdrop-blur-sm">
                기능 살펴보기
              </button>
            </Link>
          </motion.div>

          {/* Trust text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 text-sm text-zinc-500"
          >
            신용카드 없이 무료로 시작 · 500+ 크리에이터가 사용 중
          </motion.p>
        </div>

        {/* Product Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-5xl mx-auto mt-16"
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl" />

            {/* Browser frame */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
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
                    { label: "이번 달 수익", value: "₩4,500,000", change: "+23%" },
                    { label: "진행 중", value: "8건", icon: Calendar },
                    { label: "완료", value: "24건", icon: CheckCircle2 },
                    { label: "브랜드", value: "12개", icon: Users },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-zinc-900 rounded-xl p-4 border border-white/5"
                    >
                      <p className="text-xs text-zinc-500 mb-2">{stat.label}</p>
                      <p className="text-xl font-semibold text-white flex items-center gap-2">
                        {stat.value}
                        {stat.change && (
                          <span className="text-xs text-emerald-400 font-normal">{stat.change}</span>
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
                    { name: "결제", color: "#06b6d4", count: 0 },
                  ].map((col) => (
                    <div key={col.name}>
                      <div className="flex items-center gap-2 px-2 py-2 mb-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: col.color }}
                        />
                        <span className="text-xs font-medium text-zinc-400">{col.name}</span>
                      </div>
                      <div className="space-y-2 min-h-[80px]">
                        {[...Array(col.count)].map((_, j) => (
                          <div
                            key={j}
                            className="bg-zinc-900 rounded-lg p-3 border border-white/5"
                          >
                            <div className="h-2 bg-zinc-800 rounded w-4/5 mb-2" />
                            <div className="h-1.5 bg-zinc-800/50 rounded w-3/5" />
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
      </section>

      {/* Logos Section */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm text-zinc-500 mb-8">
            500+ 크리에이터가 신뢰하는 플랫폼
          </p>
          <div className="grid grid-cols-4 gap-8 items-center opacity-50">
            {["YouTube", "Instagram", "TikTok", "Blog"].map((platform) => (
              <div key={platform} className="text-center text-zinc-400 font-medium">
                {platform}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-blue-400 mb-4"
            >
              FEATURES
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              필요한 모든 기능
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-zinc-400 max-w-xl mx-auto"
            >
              복잡한 기능은 빼고, 크리에이터에게 정말 필요한 것만
            </motion.p>
          </div>

          {/* Feature grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: LayoutDashboard,
                title: "칸반 보드",
                description: "피칭부터 결제까지, 드래그 앤 드롭으로 딜 상태를 관리하세요",
              },
              {
                icon: Bell,
                title: "마감일 알림",
                description: "중요한 마감일 3일 전 이메일로 알려드립니다",
              },
              {
                icon: TrendingUp,
                title: "수익 분석",
                description: "월별, 브랜드별 수익을 차트로 한눈에 파악하세요",
              },
              {
                icon: Users,
                title: "브랜드 CRM",
                description: "담당자 연락처와 협업 히스토리를 관리하세요",
              },
              {
                icon: BarChart3,
                title: "리포트",
                description: "협찬 성과를 시각화된 리포트로 확인하세요",
              },
              {
                icon: FileText,
                title: "계약 관리",
                description: "계약서와 관련 문서를 한 곳에서 관리하세요",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-white/5 bg-zinc-950 hover:bg-zinc-900 hover:border-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900 group-hover:bg-zinc-800 border border-white/5 flex items-center justify-center mb-4 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-blue-400 mb-4"
            >
              HOW IT WORKS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              3단계로 시작하세요
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "무료 가입",
                description: "이메일 또는 구글 계정으로 30초 만에 가입",
              },
              {
                step: "02",
                title: "브랜드 & 딜 등록",
                description: "협업 브랜드와 진행 중인 딜을 등록",
              },
              {
                step: "03",
                title: "칸반으로 관리",
                description: "드래그 앤 드롭으로 상태 업데이트",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-400">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-blue-400 mb-4"
            >
              PRICING
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              심플한 요금제
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-zinc-400"
            >
              무료로 시작하고, 필요할 때 업그레이드하세요
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-white/5 bg-zinc-950"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
              <p className="text-sm text-zinc-400 mb-6">개인 크리에이터에게 적합</p>
              <div className="text-4xl font-bold text-white mb-8">
                ₩0<span className="text-base font-normal text-zinc-500">/월</span>
              </div>
              <ul className="space-y-4 mb-8">
                {["딜 10개까지", "브랜드 5개까지", "칸반 보드", "기본 분석"].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <button className="w-full py-3.5 text-sm font-medium border border-white/10 rounded-full hover:bg-white/5 transition-colors">
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
              className="relative p-8 rounded-2xl border-2 border-blue-500/30 bg-gradient-to-b from-blue-500/5 to-transparent"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 rounded-full text-xs font-medium text-white">
                추천
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <p className="text-sm text-zinc-400 mb-6">본격적인 크리에이터를 위해</p>
              <div className="text-4xl font-bold text-white mb-8">
                ₩9,900<span className="text-base font-normal text-zinc-500">/월</span>
              </div>
              <ul className="space-y-4 mb-8">
                {["딜 무제한", "브랜드 무제한", "마감일 이메일 알림", "상세 수익 분석", "데이터 내보내기", "우선 지원"].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <button className="w-full py-3.5 text-sm font-medium bg-white text-black rounded-full hover:bg-zinc-200 transition-colors">
                  Pro 시작하기
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-blue-400 mb-4"
            >
              FAQ
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              자주 묻는 질문
            </motion.h2>
          </div>

          <div className="space-y-8">
            {[
              {
                q: "무료로 사용할 수 있나요?",
                a: "네! Free 플랜으로 딜 10개, 브랜드 5개까지 무료로 사용하실 수 있습니다.",
              },
              {
                q: "내 데이터는 안전한가요?",
                a: "모든 데이터는 암호화되어 저장되며, 업계 표준 보안 프로토콜을 따릅니다.",
              },
              {
                q: "어떤 플랫폼을 지원하나요?",
                a: "유튜브, 인스타그램, 블로그, 틱톡 등 모든 플랫폼의 스폰서십을 관리할 수 있습니다.",
              },
              {
                q: "환불 정책은 어떻게 되나요?",
                a: "구매 후 14일 이내 요청 시 전액 환불해드립니다.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
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
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            지금 시작하세요
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-400 mb-8"
          >
            더 이상 엑셀과 메모장에서 시간 낭비하지 마세요.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/signup">
              <button className="group px-8 py-4 text-base font-medium bg-white text-black rounded-full hover:bg-zinc-200 transition-all flex items-center gap-2 mx-auto">
                무료로 시작하기
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-bold text-sm">
                S
              </div>
              <span className="font-medium text-white">Sponsor Tracker</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
              <Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
              <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
              <Link href="/refund" className="hover:text-white transition-colors">환불정책</Link>
              <a href="mailto:support@sponsortracker.app" className="hover:text-white transition-colors">문의하기</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-zinc-600">
            <p>© 2025 Sponsor Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
