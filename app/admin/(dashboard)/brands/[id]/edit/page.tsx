"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBrandById } from "@/api/admin/brand.api";
import BrandForm from "@/app/components/admin/forms/BrandForm";

const BrandEditPage = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const data = await getBrandById(id as string);
        setBrand(data.data || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBrand();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center text-sm text-neutral-500">
        Loading brand details...
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center text-sm text-red-500 font-semibold">
        Brand not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <BrandForm
        brandId={brand._id}
        defaultValues={{
          name: brand.name,
          description: brand.description,
          isActive: brand.isActive !== false ? "true" : "false",
          logoUrl: brand.logo?.path || brand.logo?.url,
        }}
      />
    </div>
  );
};

export default BrandEditPage;