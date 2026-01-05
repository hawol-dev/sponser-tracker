import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function RefundPage() {
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
          환불정책
        </h1>
        <p className="text-zinc-500 mb-12">최종 수정일: 2025년 1월 1일</p>

        <div className="prose prose-invert prose-zinc max-w-none">
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">1. 환불 가능 기간</h2>
            <p className="text-zinc-400 leading-relaxed">
              Pro 플랜 결제 후 7일 이내에 환불을 요청하실 수 있습니다.
              7일이 지난 후에는 환불이 불가능하며, 남은 기간 동안 서비스를 계속 이용하실 수 있습니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">2. 환불 방법</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              환불을 원하시는 경우:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>이메일(jsh0218131@gmail.com)로 환불 요청</li>
              <li>결제에 사용된 이메일 주소 기재</li>
              <li>환불 사유 기재 (선택사항)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">3. 환불 금액</h2>
            <p className="text-zinc-400 leading-relaxed">
              결제 후 7일 이내 환불 요청 시 결제 금액 전액을 환불해 드립니다.
              환불은 원래 결제 수단으로 처리되며, 처리 기간은 결제사에 따라 3~7 영업일이 소요될 수 있습니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">4. 환불 불가 사유</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              다음의 경우 환불이 불가능합니다:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>결제 후 7일이 경과한 경우</li>
              <li>이용약관 위반으로 서비스 이용이 제한된 경우</li>
              <li>부정한 방법으로 결제한 경우</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">5. 구독 취소</h2>
            <p className="text-zinc-400 leading-relaxed">
              구독은 언제든지 취소하실 수 있습니다.
              구독을 취소하시면 다음 결제일부터 요금이 청구되지 않으며,
              현재 결제 기간이 끝날 때까지 Pro 기능을 계속 이용하실 수 있습니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">6. 문의처</h2>
            <p className="text-zinc-400 leading-relaxed">
              환불에 관한 문의사항은 아래 이메일로 연락해주세요:
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
