


import React, { useState } from "react";

export type ShareProductButtonProps = {
  product: {
    id: string;
    name: string;
    url: string;
    image?: string;
  };
  className?: string;
};

const ShareProductButton: React.FC<ShareProductButtonProps> = ({
  product,
  className = "",
}) => {
  const [status, setStatus] = useState<string>("");

  const shareData = {
    title: product.name,
    text: `Check out this product: ${product.name}`,
    url: product.url,
  };

  const encodedUrl = encodeURIComponent(product.url);
  const encodedText = encodeURIComponent(`Check out this product: ${product.name}`);

  const whatsappUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  const handleShare = async () => {
    try {
      // Native Web Share API (mobile-friendly)
      if (navigator.share) {
        await navigator.share(shareData);
        setStatus("Shared successfully");
        return;
      }

      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(product.url);
      setStatus("Link copied to clipboard");
    } catch (error) {
      console.error("Share failed:", error);
      setStatus("Unable to share");
    }

    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <div className={`inline-flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <button
          onClick={handleShare}
          className="px-3 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-800 transition"
        >
          Share
        </button>

        {status && (
          <span className="text-xs text-gray-500 transition">{status}</span>
        )}
      </div>

      {/* Social Share Links */}
      <div className="flex items-center gap-2 text-xs">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
        >
          WhatsApp
        </a>

        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 rounded bg-black text-white hover:bg-gray-800 transition"
        >
          X
        </a>

        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Facebook
        </a>
      </div>
    </div>
  );
};

export default ShareProductButton;
