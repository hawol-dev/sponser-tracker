import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] overflow-hidden">
      {/* 배경 레이어 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-500/[0.07] rounded-full blur-[120px]" />
      </div>

      {/* 네비게이션 */}
      <nav className="fixed top-0 w-full border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-sm font-bold">
              S
            </div>
            <span className="font-semibold text-white">Sponsor Tracker</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="text-white/60 hover:text-white transition-colors">기능</a>
            <a href="#how-it-works" className="text-white/60 hover:text-white transition-colors">사용법</a>
            <a href="#pricing" className="text-white/60 hover:text-white transition-colors">요금제</a>
            <a href="#faq" className="text-white/60 hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/[0.06]">
                로그인
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">무료 시작</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            {/* 배지 */}
            <div className="inline-flex items-center gap-2 bg-violet-500/10 text-violet-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-violet-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400"></span>
              </span>
              크리에이터를 위한 스폰서십 관리
            </div>

            {/* 메인 헤드라인 */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
              협찬 관리,
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                더 이상 복잡하지 않게
              </span>
            </h1>

            {/* 서브헤드 */}
            <p className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
              피칭부터 결제까지, 모든 스폰서십을 한 곳에서.
              <br className="hidden sm:block" />
              칸반보드로 진행 상황을 시각화하고 수익을 분석하세요.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <Link href="/signup">
                <Button size="lg" className="text-base px-8 h-12 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all">
                  무료로 시작하기
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="text-base px-8 h-12">
                  어떻게 작동하나요?
                </Button>
              </a>
            </div>
            <p className="text-sm text-white/30">카드 없이 무료로 시작</p>
          </div>

          {/* 제품 미리보기 */}
          <div className="mt-20 relative">
            {/* 그로우 효과 */}
            <div className="absolute -inset-10 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-3xl opacity-50" />

            <div className="relative rounded-2xl border border-white/[0.1] bg-[#0c0c0f] shadow-2xl overflow-hidden">
              {/* 브라우저 크롬 */}
              <div className="bg-[#16161a] px-4 py-3 flex items-center gap-3 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-white/[0.05] text-xs text-white/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    app.sponsortracker.io
                  </div>
                </div>
              </div>

              {/* 대시보드 UI */}
              <div className="p-6 bg-gradient-to-b from-[#0c0c0f] to-[#0f0f13]">
                {/* 상단 통계 */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "이번 달 수익", value: "₩4,500,000", change: "+23%" },
                    { label: "진행 중", value: "8건", change: "" },
                    { label: "완료", value: "24건", change: "" },
                    { label: "협업 브랜드", value: "12개", change: "" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
                      <p className="text-xs text-white/40 mb-1">{stat.label}</p>
                      <p className="text-lg font-semibold text-white flex items-center gap-2">
                        {stat.value}
                        {stat.change && <span className="text-xs text-emerald-400">{stat.change}</span>}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 칸반 보드 */}
                <div className="grid grid-cols-6 gap-3">
                  {[
                    { name: "피칭", color: "#71717a", count: 3 },
                    { name: "협상 중", color: "#f59e0b", count: 2 },
                    { name: "계약", color: "#3b82f6", count: 2 },
                    { name: "제작 중", color: "#8b5cf6", count: 1 },
                    { name: "게시", color: "#10b981", count: 1 },
                    { name: "결제", color: "#14b8a6", count: 0 },
                  ].map((col) => (
                    <div key={col.name} className="space-y-2">
                      <div className="flex items-center gap-2 px-2 py-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                        <span className="text-xs font-medium text-white/60">{col.name}</span>
                        <span className="text-xs text-white/30">{col.count}</span>
                      </div>
                      <div className="space-y-2 min-h-[120px]">
                        {[...Array(col.count)].map((_, j) => (
                          <div key={j} className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.06] hover:border-white/[0.1] transition-colors">
                            <div className="h-2 bg-white/10 rounded w-4/5 mb-2" />
                            <div className="h-1.5 bg-white/5 rounded w-3/5" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 */}
      <section className="py-16 px-6 border-y border-white/[0.06]">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "₩2억+", label: "관리된 협찬 금액" },
              { value: "500+", label: "크리에이터" },
              { value: "1,200+", label: "완료된 딜" },
              { value: "99%", label: "고객 만족도" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 문제점 섹션 */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            아직도 이렇게 관리하고 계신가요?
          </h2>
          <p className="text-lg text-white/50 mb-12">
            많은 크리에이터들이 겪는 문제입니다
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📊", title: "엑셀 스프레드시트", desc: "복잡한 수식과 끝없는 시트 탭" },
              { icon: "📝", title: "메모장과 노션", desc: "흩어진 정보, 놓치는 마감일" },
              { icon: "💬", title: "카톡 대화창 검색", desc: "\"그 브랜드 담당자 이름이 뭐였지?\"" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-red-500/5 border border-red-500/10">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 기능 - Bento Grid */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-violet-400 mb-3">FEATURES</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              스폰서십 관리의 모든 것
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              크리에이터에게 필요한 기능만 담았습니다
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* 대형 카드 1 - 칸반 */}
            <div className="md:col-span-2 md:row-span-2 group relative rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">칸반 보드</h3>
                <p className="text-white/60 mb-8 max-w-md">
                  피칭, 협상, 계약, 제작, 게시, 결제까지.
                  드래그 앤 드롭으로 딜 상태를 관리하세요.
                </p>

                {/* 미니 칸반 미리보기 */}
                <div className="grid grid-cols-4 gap-2">
                  {["협상 중", "계약", "제작 중", "결제"].map((name, i) => (
                    <div key={i} className="bg-white/[0.03] rounded-lg p-2 border border-white/[0.06]">
                      <div className="text-[10px] text-white/40 mb-2">{name}</div>
                      {[...Array(2 - Math.floor(i / 2))].map((_, j) => (
                        <div key={j} className="bg-white/[0.05] rounded p-2 mb-1.5 last:mb-0">
                          <div className="h-1.5 bg-white/10 rounded w-full mb-1" />
                          <div className="h-1 bg-white/5 rounded w-2/3" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 중형 카드 - 마감일 알림 */}
            <div className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 hover:border-amber-500/30 transition-colors">
              <div className="w-10 h-10 bg-amber-500/15 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">마감일 알림</h3>
              <p className="text-sm text-white/50">중요한 마감일 3일 전 이메일로 알려드려요</p>
            </div>

            {/* 중형 카드 - 수익 분석 */}
            <div className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 hover:border-emerald-500/30 transition-colors">
              <div className="w-10 h-10 bg-emerald-500/15 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                  <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">수익 분석</h3>
              <p className="text-sm text-white/50">월별, 브랜드별 수익을 차트로 한눈에</p>
            </div>

            {/* 중형 카드 - 브랜드 관리 */}
            <div className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 hover:border-blue-500/30 transition-colors">
              <div className="w-10 h-10 bg-blue-500/15 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                  <path d="M12 3v6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">브랜드 CRM</h3>
              <p className="text-sm text-white/50">담당자 연락처와 협업 히스토리 관리</p>
            </div>

            {/* 중형 카드 - 콘텐츠 타입 */}
            <div className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 hover:border-pink-500/30 transition-colors">
              <div className="w-10 h-10 bg-pink-500/15 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
                  <path d="m22 8-6 4 6 4V8Z" />
                  <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">콘텐츠 타입</h3>
              <p className="text-sm text-white/50">유튜브, 인스타, 블로그 등 구분 관리</p>
            </div>

            {/* 중형 카드 - 데이터 보안 */}
            <div className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 hover:border-cyan-500/30 transition-colors">
              <div className="w-10 h-10 bg-cyan-500/15 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">안전한 데이터</h3>
              <p className="text-sm text-white/50">모든 데이터 암호화 저장</p>
            </div>
          </div>
        </div>
      </section>

      {/* 사용법 */}
      <section id="how-it-works" className="py-24 px-6 bg-white/[0.01]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-violet-400 mb-3">HOW IT WORKS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              3단계로 시작하세요
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "무료 가입",
                desc: "이메일 또는 구글 계정으로 30초 만에 가입하세요",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M19 8v6" />
                    <path d="M22 11h-6" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "브랜드 & 딜 등록",
                desc: "협업 브랜드와 진행 중인 딜을 등록하세요",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "칸반으로 관리",
                desc: "드래그 앤 드롭으로 딜 상태를 업데이트하세요",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-violet-500/50 to-transparent -translate-x-8" />
                )}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 mb-6 text-violet-400">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-violet-400 mb-2">{item.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 요금제 */}
      <section id="pricing" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-violet-400 mb-3">PRICING</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              심플한 요금제
            </h2>
            <p className="text-lg text-white/50">
              무료로 시작하고, 필요할 때 업그레이드하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-8">
              <h3 className="text-lg font-semibold text-white mb-2">Free</h3>
              <p className="text-sm text-white/50 mb-6">개인 크리에이터에게 적합</p>
              <div className="text-4xl font-bold text-white mb-6">
                ₩0<span className="text-lg font-normal text-white/50">/월</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["딜 10개까지", "브랜드 5개까지", "칸반 보드", "기본 분석"].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="w-full">무료로 시작</Button>
              </Link>
            </div>

            {/* Pro */}
            <div className="relative rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/30 p-8">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full text-xs font-medium text-white">
                추천
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Pro</h3>
              <p className="text-sm text-white/50 mb-6">본격적인 크리에이터를 위해</p>
              <div className="text-4xl font-bold text-white mb-6">
                ₩9,900<span className="text-lg font-normal text-white/50">/월</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["딜 무제한", "브랜드 무제한", "마감일 이메일 알림", "상세 수익 분석", "데이터 내보내기", "우선 지원"].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button className="w-full">Pro 시작하기</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-white/[0.01]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-violet-400 mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              자주 묻는 질문
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "무료로 사용할 수 있나요?",
                a: "네! Free 플랜으로 딜 10개, 브랜드 5개까지 무료로 사용하실 수 있습니다. 신용카드 없이 바로 시작하세요.",
              },
              {
                q: "내 데이터는 안전한가요?",
                a: "모든 데이터는 암호화되어 저장되며, 업계 표준 보안 프로토콜을 따릅니다. 데이터는 언제든 내보낼 수 있습니다.",
              },
              {
                q: "어떤 플랫폼을 지원하나요?",
                a: "유튜브, 인스타그램, 블로그, 틱톡 등 모든 콘텐츠 플랫폼의 스폰서십을 관리할 수 있습니다.",
              },
              {
                q: "환불 정책은 어떻게 되나요?",
                a: "구매 후 14일 이내 요청 시 전액 환불해드립니다. 만족하지 않으시면 언제든 환불 요청하세요.",
              },
              {
                q: "팀으로 사용할 수 있나요?",
                a: "현재는 개인 사용자를 위한 서비스입니다. 팀/에이전시 기능은 추후 업데이트 예정입니다.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.08] p-6">
                <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="relative rounded-3xl bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-indigo-500/20 border border-violet-500/20 p-12 md:p-16 text-center overflow-hidden">
            {/* 배경 효과 */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                스폰서십 관리,<br />지금 시작하세요
              </h2>
              <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
                더 이상 엑셀과 메모장에서 시간 낭비하지 마세요.
                지금 무료로 시작하세요.
              </p>
              <Link href="/signup">
                <Button size="lg" className="text-base px-10 h-14 shadow-xl shadow-violet-500/30">
                  무료로 시작하기
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t border-white/[0.06] py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-sm font-bold">
                S
              </div>
              <span className="font-semibold text-white">Sponsor Tracker</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
              <Link href="/privacy" className="hover:text-white/80 transition-colors">개인정보처리방침</Link>
              <Link href="/terms" className="hover:text-white/80 transition-colors">이용약관</Link>
              <Link href="/refund" className="hover:text-white/80 transition-colors">환불정책</Link>
              <a href="mailto:support@sponsortracker.app" className="hover:text-white/80 transition-colors">문의하기</a>
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
