import { BrandForm } from "@/components/brands/brand-form";

export default function NewBrandPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">새 브랜드 추가</h1>
        <p className="text-muted-foreground">새로운 협업 브랜드를 등록하세요</p>
      </div>

      <div className="max-w-2xl">
        <BrandForm />
      </div>
    </div>
  );
}
