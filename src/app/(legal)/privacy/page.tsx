import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "Sponsor Tracker의 개인정보처리방침입니다. 수집하는 정보, 이용 목적, 보관 기간 등을 확인하세요.",
  openGraph: {
    title: "개인정보처리방침 | Sponsor Tracker",
    description: "Sponsor Tracker의 개인정보처리방침입니다.",
  },
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
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
          개인정보처리방침
        </h1>
        <p className="text-zinc-500 mb-12">최종 수정일: 2025년 1월 1일</p>

        <div className="prose prose-invert prose-zinc max-w-none">
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">1. 수집하는 개인정보</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Sponsor Tracker(이하 &quot;서비스&quot;)는 다음과 같은 개인정보를 수집합니다:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>이메일 주소</li>
              <li>이름 (선택사항)</li>
              <li>서비스 이용 기록</li>
              <li>결제 정보 (유료 서비스 이용 시)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">2. 개인정보의 이용 목적</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              수집된 개인정보는 다음 목적으로 이용됩니다:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>서비스 제공 및 운영</li>
              <li>사용자 인증 및 계정 관리</li>
              <li>고객 지원 및 문의 응대</li>
              <li>서비스 개선 및 신규 기능 개발</li>
              <li>마감일 알림 등 이메일 발송</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">3. 개인정보의 보관 및 파기</h2>
            <p className="text-zinc-400 leading-relaxed">
              회원 탈퇴 시 또는 개인정보 수집 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
              단, 관계 법령에 따라 보존할 필요가 있는 경우에는 해당 기간 동안 보관합니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">4. 개인정보의 제3자 제공</h2>
            <p className="text-zinc-400 leading-relaxed">
              서비스는 원칙적으로 사용자의 개인정보를 외부에 제공하지 않습니다.
              다만, 사용자의 동의가 있거나 법령에 의해 요구되는 경우에는 예외로 합니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">5. 사용자의 권리</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              사용자는 다음과 같은 권리를 행사할 수 있습니다:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>개인정보 열람 요청</li>
              <li>개인정보 정정 요청</li>
              <li>개인정보 삭제 요청</li>
              <li>개인정보 처리 정지 요청</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">6. 문의처</h2>
            <p className="text-zinc-400 leading-relaxed">
              개인정보 처리에 관한 문의사항은 아래 이메일로 연락해주세요:
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
