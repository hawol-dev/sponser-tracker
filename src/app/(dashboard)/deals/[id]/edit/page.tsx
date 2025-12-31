import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DealForm } from "@/components/deals/deal-form";
import { getDeal, getBrandsForSelect } from "@/lib/actions/deals";

interface EditDealPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDealPage({ params }: EditDealPageProps) {
  const { id } = await params;

  let deal;
  try {
    deal = await getDeal(id);
  } catch {
    notFound();
  }

  const brands = await getBrandsForSelect();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/deals/${deal.id}`}>
          <Button variant="ghost" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            뒤로
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">딜 수정</h1>
          <p className="text-muted-foreground">{deal.title} 정보를 수정하세요</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <DealForm deal={deal} brands={brands} />
      </div>
    </div>
  );
}
