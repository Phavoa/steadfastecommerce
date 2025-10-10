"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode, A11y } from "swiper/modules"; // <- modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import ProductGridHeader from "./ProductGridHeader";
import CartButton from "./CartButton";
import { Product } from "@/types/product";

type ProductSliderProp = {
  title: string;
  mobileGridSize?: number;
  products: Product[];
};

export default function ProductSlider({
  title,
  mobileGridSize = 2,
  products,
}: ProductSliderProp) {
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});
  const [cartCount, setCartCount] = useState(3);

  function toggleWishlist(id: number) {
    setWishlist((s) => ({ ...s, [id]: !s[id] }));
  }

  function addToCart(id: number) {
    setCartCount((c) => c + 1);
  }

  return (
    <section className="md:hidden max-w-[1300px] mx-auto px-4 md:px-6 pb-4">
      <ProductGridHeader title={title} />

      <Swiper
        modules={[Navigation, Pagination, FreeMode, A11y]}
        spaceBetween={8}
        slidesPerView={mobileGridSize}
        // navigation={true}
        pagination={{
          clickable: true,
          el: ".custom-pagination", // attach to a custom element
        }}
        freeMode={false} // try true if you want glide-like behavior
        loop={false}
        allowTouchMove={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        className="py-2"
      >
        {products.map((product, index) => (
          <SwiperSlide key={`${product.productId}-${index}`}>
            <ProductCard
              product={product}
              onToggleWishlist={toggleWishlist}
              index={index}
            />
          </SwiperSlide>
        ))}
        <div className="custom-pagination mt-4 flex justify-center mx-auto gap-1"></div>
      </Swiper>
    </section>
  );
}
