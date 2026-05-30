

import React, { useEffect, useRef, useState } from "react";
import ViralLandingCard from "../../../components/product/ViralLandingCard";
import { useVendorProductsFeed } from "../../../hooks/vendor/useVendorProducts";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ViralFeedPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVendorProductsFeed(10);

  const products =
    data?.pages.flatMap((p) => p.products) ?? [];

  const [index, setIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  /* ================= SHARE REF ================= */
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");

  const shareUrl = `${window.location.origin}/viral-feed${
    ref ? `?ref=${ref}` : ""
  }`;

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Viral feed link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  /* ================= INFINITE SCROLL ================= */
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (
          entry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  /* ================= SWIPE ================= */
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff =
      touchStartY.current - e.changedTouches[0].clientY;

    if (diff > 60) {
      setIndex((prev) =>
        Math.min(prev + 1, products.length - 1)
      );
    }

    if (diff < -60) {
      setIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const currentProduct = products[index];

     return (
  <div
    ref={containerRef}
    className="h-screen w-full bg-gradient-to-b from-black via-zinc-900 to-black overflow-hidden relative"
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
  >
    {/* ================= TOP BAR ================= */}
    <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center px-4">
      
      <div className="text-white font-bold text-lg tracking-wide">
        GO-Shopping FEED
      </div>

      <button
        onClick={copyShareLink}
        className="bg-white/10 text-white px-4 py-2 rounded-full text-xs backdrop-blur-xl border border-white/20 hover:bg-white/20 transition"
      >
        Copy Feed
      </button>
    </div>

    {/* ================= REF BADGE ================= */}
    {ref && (
      <div className="absolute top-16 left-4 z-20 bg-pink-500/20 text-pink-200 px-3 py-1 rounded-full text-xs backdrop-blur-xl border border-pink-400/20">
        🎯 Shared Store Feed
      </div>
    )}

    {/* ================= MAIN STAGE ================= */}
    <div className="h-full flex items-center justify-center px-4">

      {currentProduct ? (
        <div className="w-full max-w-sm transform transition-all duration-300 scale-100">
          
          <ViralLandingCard
            product={{
              id: currentProduct._id ?? "",
              name: currentProduct.name,
              description: currentProduct.description,
              price: String(currentProduct.price),
              image: currentProduct.media?.[0]?.url,
              url: `${window.location.origin}/products/${currentProduct._id}`,
            }}
            ctaText="Buy Now"
            onClick={() =>
              console.log("buy", currentProduct._id)
            }
            className="shadow-2xl rounded-3xl"
          />
        </div>
      ) : (
        <div className="text-white/60 text-center">
          Loading feed...
        </div>
      )}
    </div>

    {/* ================= LOADER TRIGGER ================= */}
    <div ref={loaderRef} className="h-10" />

    {/* ================= FOOTER HINT ================= */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-wide">
      Swipe up/down to explore products
    </div>

    {/* ================= DEPTH OVERLAY ================= */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
  </div>
);
}