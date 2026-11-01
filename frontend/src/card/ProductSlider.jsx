import { useRef, useState, useEffect } from "react";
import staticProducts from "../data/product";
import { productsAPI } from "../services/api";
import ProductCard from "./ProductCard";

export default function ProductSlider() {
  const sliderRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [products, setProducts] = useState(staticProducts);

  const touchStartX = useRef(null);
  const touchStartScroll = useRef(null);

  // Fetch from API, fallback to static data
  useEffect(() => {
    productsAPI.getAll()
      .then((data) => {
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => { /* keep static fallback */ });
  }, []);

  const updateButtons = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    return () => el.removeEventListener("scroll", updateButtons);
  }, [products]);

  const scrollBy = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(":scope > *")?.offsetWidth || 288;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartScroll.current = sliderRef.current?.scrollLeft ?? 0;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.touches[0].clientX;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = touchStartScroll.current + dx;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
    touchStartScroll.current = null;
  };

  return (
    <div className="relative">
      <button
        onClick={() => scrollBy(-1)}
        disabled={!canPrev}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-white dark:bg-[#1a1a1a] shadow-md border border-gray-200 dark:border-gray-700 rounded-full cursor-pointer text-xl transition-all duration-200 hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black -translate-x-1/2 ${
          canPrev ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Previous"
      >
        ←
      </button>

      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-1"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {products.map((product) => (
          <ProductCard key={product.productId || product.id} product={product} />
        ))}
      </div>

      <button
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-white dark:bg-[#1a1a1a] shadow-md border border-gray-200 dark:border-gray-700 rounded-full cursor-pointer text-xl transition-all duration-200 hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black translate-x-1/2 ${
          canNext ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Next"
      >
        →
      </button>
    </div>
  );
}