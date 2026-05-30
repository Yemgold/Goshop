




import React, { useEffect, useRef, useState } from "react";

export type ViralLandingCardProps = {
  product: {
    id: string;
    name: string;
    description?: string;
    price?: string;
    image?: string;
    url: string;
  };
  ctaText?: string;
  onClick?: () => void;
  className?: string;
};

const ViralLandingCard: React.FC<ViralLandingCardProps> = ({
  product,
  ctaText = "Shop Now",
  onClick,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const raf = useRef<number | null>(null);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;

    const delta = clientX - startX.current;

    if (raf.current) cancelAnimationFrame(raf.current);

    raf.current = requestAnimationFrame(() => {
      setOffsetX(delta);
    });
  };

  const handleEnd = () => {
    setIsDragging(false);

    // smooth reset animation
    setOffsetX(0);

    if (raf.current) cancelAnimationFrame(raf.current);
  };

  // mouse
  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onMouseUp = () => handleEnd();

  // touch
  const onTouchStart = (e: React.TouchEvent) =>
    handleStart(e.touches[0].clientX);

  const onTouchMove = (e: React.TouchEvent) =>
    handleMove(e.touches[0].clientX);

  const onTouchEnd = () => handleEnd();

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);

    window.addEventListener("mouseup", handleMouseUpGlobal);

    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div
        ref={cardRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="
          relative w-full max-w-sm
          rounded-3xl overflow-hidden
          shadow-2xl bg-black
          border border-white/10
          select-none touch-pan-y
        "
        style={{
          transform: `translateX(${offsetX}px) rotate(${offsetX * 0.03}deg)`,
          transition: isDragging ? "none" : "transform 0.25s ease",
        }}
      >
        {/* ================= SWIPE BADGES ================= */}
        <div className="absolute inset-0 flex items-center justify-between px-4 text-white font-bold pointer-events-none z-10">
          <div
            className="bg-green-500 px-3 py-1 rounded-full text-xs"
            style={{ opacity: offsetX > 40 ? 1 : 0 }}
          >
            LIKE
          </div>

          <div
            className="bg-red-500 px-3 py-1 rounded-full text-xs"
            style={{ opacity: offsetX < -40 ? 1 : 0 }}
          >
            SKIP
          </div>
        </div>

        {/* ================= IMAGE (BALANCED FEED STYLE) ================= */}
        <div className="relative w-full aspect-[4/5] bg-black overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="
                w-full h-full
                object-cover object-center
                scale-100
              "
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-4 flex flex-col gap-2 text-white">
          <h3 className="text-lg font-semibold line-clamp-2">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-sm text-white/70 line-clamp-2">
              {product.description}
            </p>
          )}

          {product.price && (
            <p className="text-base font-bold text-white">
              {product.price}
            </p>
          )}

          <button
            onClick={onClick}
            className="
              mt-2 w-full py-3
              rounded-xl
              bg-white text-black
              text-sm font-semibold
              hover:bg-gray-200
              transition
            "
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViralLandingCard;