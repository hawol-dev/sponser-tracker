import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandForm } from "@/components/brands/brand-form";
import { getBrand } from "@/lib/actions/brands";

interface EditBrandPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBrandPage({ params }: EditBrandPageProps) {
  const { id } = await params;

  let brand;
  try {
    brand = await getBrand(id);
  } catch {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/brands/${brand.id}`}>
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
          <h1 className="text-2xl font-bold">브랜드 수정</h1>
          <p className="text-muted-foreground">{brand.name} 정보를 수정하세요</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <BrandForm brand={brand} />
      </div>
    </div>
  );
}
