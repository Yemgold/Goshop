
import {
  Copy,
  
  MessageCircle,
  Send,
  Share2,
  
  Check,
} from "lucide-react";

import { FaFacebook, FaXTwitter } from "react-icons/fa6";

import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "../ui/Button";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;

  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
}

export default function ShareModal({
  open,
  onClose,
  product,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  /* ================= URL ================= */

  const shareUrl = `${window.location.origin}/products/${product._id}`;

  const shareText = `🔥 Check out "${product.name}" on SWAGA.\nOnly ₦${product.price.toLocaleString()}.\nShop now 👇`;

  /* ================= COPY ================= */

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);

      setCopied(true);

      toast.success("Product link copied!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  /* ================= SHARE LINKS ================= */

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
    `${shareText}\n${shareUrl}`
  )}`;

  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${shareText}\n${shareUrl}`
  )}`;

  const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(shareText)}`;

  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          w-full max-w-lg
          rounded-3xl
          bg-white
          shadow-2xl
          overflow-hidden
        "
      >
        {/* ================= HEADER ================= */}

        <div
          className="
            p-6
            bg-gradient-to-r
            from-black
            via-gray-900
            to-black
            text-white
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                w-12 h-12 rounded-2xl
                bg-white/10
                flex items-center justify-center
              "
            >
              <Share2 size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Share Product
              </h2>

              <p className="text-white/70 text-sm">
                Turn views into sales 🚀
              </p>
            </div>
          </div>
        </div>

        {/* ================= BODY ================= */}

        <div className="p-6 space-y-6">
          {/* PRODUCT PREVIEW */}

          <div
            className="
              flex gap-4
              rounded-2xl
              border
              p-4
              bg-gray-50
            "
          >
            <img
              src={
                product.image ||
                "/images/placeholder.png"
              }
              alt={product.name}
              className="
                w-24 h-24
                rounded-2xl
                object-cover
                border
              "
            />

            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {product.name}
              </h3>

              <p className="text-2xl font-bold mt-2">
                ₦
                {product.price.toLocaleString()}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Viral-ready product page
              </p>
            </div>
          </div>

          {/* SHARE URL */}

          <div>
            <label className="text-sm font-medium text-gray-600">
              Share Link
            </label>

            <div
              className="
                mt-2
                flex items-center gap-2
                border rounded-2xl
                p-2
              "
            >
              <input
                value={shareUrl}
                readOnly
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-sm
                  text-gray-600
                "
              />

              <Button onClick={copyLink}>
                {copied ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}
              </Button>
            </div>
          </div>

          {/* SOCIAL BUTTONS */}

          <div className="grid grid-cols-2 gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="
                flex items-center justify-center gap-2
                rounded-2xl
                bg-green-500
                text-white
                py-3
                font-medium
                hover:scale-[1.02]
                transition
              "
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>

            <a
              href={telegramLink}
              target="_blank"
              rel="noreferrer"
              className="
                flex items-center justify-center gap-2
                rounded-2xl
                bg-sky-500
                text-white
                py-3
                font-medium
                hover:scale-[1.02]
                transition
              "
            >
              <Send size={18} />
              Telegram
            </a>

            <a
              href={twitterLink}
              target="_blank"
              rel="noreferrer"
              className="
                flex items-center justify-center gap-2
                rounded-2xl
                bg-black
                text-white
                py-3
                font-medium
                hover:scale-[1.02]
                transition
              "
            >
              <FaXTwitter size={18} />
              X / Twitter
            </a>

            <a
              href={facebookLink}
              target="_blank"
              rel="noreferrer"
              className="
                flex items-center justify-center gap-2
                rounded-2xl
                bg-blue-600
                text-white
                py-3
                font-medium
                hover:scale-[1.02]
                transition
              "
            >
              <FaFacebook size={18} />
              Facebook
            </a>
          </div>

          {/* CTA */}

          <div
            className="
              rounded-2xl
              bg-gradient-to-r
              from-orange-100
              to-pink-100
              p-4
              border
            "
          >
            <p className="text-sm text-gray-700 leading-relaxed">
              The more you share your product, the more
              traffic and sales you generate. Post on
              WhatsApp Status, TikTok, Instagram Reels,
              and Facebook groups for maximum reach.
            </p>
          </div>

          {/* ACTIONS */}

          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}