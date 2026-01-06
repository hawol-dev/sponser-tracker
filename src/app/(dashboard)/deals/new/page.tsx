import { DealForm } from "@/components/deals/deal-form";
import { getBrandsForSelect } from "@/lib/actions/deals";

export default async function NewDealPage() {
  const brands = await getBrandsForSelect();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">새 협찬 추가</h1>
        <p className="text-muted-foreground">새로운 스폰서십 협찬을 등록하세요</p>
      </div>

      <div className="max-w-2xl">
        <DealForm brands={brands} />
      </div>
    </div>
  );
}
