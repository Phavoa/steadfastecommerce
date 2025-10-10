import { NormalizedProduct } from "@/types/product";

interface ProductInfoProps {
  product: NormalizedProduct;
  priceRange: { min: number; max: number } | null;
}

export function ProductInfo({ product, priceRange }: ProductInfoProps) {
  return (
    <div className="flex-1">
      <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
      <p className="text-gray-400 text-sm mb-4">{product.category}</p>

      <p className="text-gray-600 mb-8 leading-relaxed">
        {product.description}
      </p>

      <p className="text-lg md:text-2xl text-gray-700 font-semibold border-y border-gray-200 py-4">
        NGN{" "}
        {priceRange
          ? `${priceRange.min.toLocaleString()}.00 - NGN ${priceRange.max.toLocaleString()}.00`
          : product.price.toLocaleString()}
        .00
      </p>
    </div>
  );
}
