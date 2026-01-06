import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "이용약관",
  description: "Sponsor Tracker 서비스 이용약관입니다. 서비스 이용 조건과 회원의 권리 및 의무를 확인하세요.",
  openGraph: {
    title: "이용약관 | Sponsor Tracker",
    description: "Sponsor Tracker 서비스 이용약관입니다.",
  },
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          홈으로 돌아가기
        </Link>

        <h1
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: "Georgia, serif" }}
        >
          이용약관
        </h1>
        <p className="text-zinc-500 mb-12">최종 수정일: 2025년 1월 1일</p>

        <div className="prose prose-invert prose-zinc max-w-none">
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">제1조 (목적)</h2>
            <p className="text-zinc-400 leading-relaxed">
              이 약관은 Sponsor Tracker(이하 &quot;서비스&quot;)가 제공하는 서비스의 이용 조건 및
              절차, 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">제2조 (정의)</h2>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>&quot;서비스&quot;란 크리에이터의 협찬 관리를 위한 웹 애플리케이션을 말합니다.</li>
              <li>&quot;회원&quot;이란 서비스에 가입하여 이용하는 자를 말합니다.</li>
              <li>&quot;콘텐츠&quot;란 회원이 서비스에 등록한 모든 정보를 말합니다.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">제3조 (서비스의 내용)</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              서비스는 다음과 같은 기능을 제공합니다:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>협찬 관리 (칸반 보드)</li>
              <li>브랜드 정보 관리</li>
              <li>수익 분석 및 통계</li>
              <li>마감일 알림 서비스</li>
              <li>데이터 내보내기</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">제4조 (회원가입)</h2>
            <p className="text-zinc-400 leading-relaxed">
              회원가입은 이메일 또는 소셜 계정(Google)을 통해 진행할 수 있습니다.
              회원은 가입 시 정확한 정보를 제공해야 하며, 허위 정보로 인한 불이익은 회원이 부담합니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">제5조 (서비스 이용료)</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              서비스는 무료 플랜과 유료 플랜(Pro)으로 구분됩니다:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>Free: 기본 기능, 협찬 10개 제한</li>
              <li>Pro: 모든 기능, 무제한 이용 (월 9,900원)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">제6조 (회원의 의무)</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              회원은 다음 사항을 준수해야 합니다:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>타인의 개인정보를 도용하지 않을 것</li>
              <li>서비스를 부정한 목적으로 사용하지 않을 것</li>
              <li>서비스 운영을 방해하지 않을 것</li>
              <li>관련 법령을 준수할 것</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">제7조 (서비스 중단)</h2>
            <p className="text-zinc-400 leading-relaxed">
              서비스는 시스템 점검, 보수, 기타 불가피한 사유로 일시적으로 중단될 수 있습니다.
              이 경우 사전에 공지하며, 부득이한 경우 사후에 공지할 수 있습니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">제8조 (면책조항)</h2>
            <p className="text-zinc-400 leading-relaxed">
              서비스는 천재지변, 기타 불가항력적 사유로 인한 서비스 중단에 대해 책임지지 않습니다.
              또한 회원의 귀책사유로 인한 서비스 이용 장애에 대해 책임지지 않습니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">제9조 (문의처)</h2>
            <p className="text-zinc-400 leading-relaxed">
              서비스 이용에 관한 문의사항은 아래 이메일로 연락해주세요:
              <br />
              <a href="mailto:jsh0218131@gmail.com" className="text-cyan-400 hover:text-cyan-300">
                jsh0218131@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
