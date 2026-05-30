
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Copy,
  Share2,
  MessageCircle,
  Send,
  ArrowRight,
} from "lucide-react";

import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";

import { toast } from "react-toastify";

import { useVendorProducts } from "../../../hooks/vendor/useVendorProducts";

export default function ViralProductPage() {
  const { id } = useParams();

  /* ================= FETCH PRODUCTS ================= */
  const { data } = useVendorProducts(1, 100);

  const products = data?.products ?? [];

  const product = useMemo(
    () => products.find((p) => p._id === id),
    [products, id]
  );

  /* ================= SHARE URL ================= */
  const shareUrl = `${window.location.origin}/products/${id}?ref=vendor`;

  /* ================= COPY LINK ================= */
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);

      toast.success("Share link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  /* ================= WHATSAPP SHARE ================= */
  const whatsappText = encodeURIComponent(
    `🔥 Check this out on SWAGA\n\n${product?.name}\n₦${Number(
      product?.price || 0
    ).toLocaleString()}\n\nShop now 👉 ${shareUrl}`
  );

  const whatsappLink = `https://wa.me/?text=${whatsappText}`;

  /* ================= TELEGRAM SHARE ================= */
  const telegramLink = `https://t.me/share/url?url=${shareUrl}`;

  /* ================= FACEBOOK SHARE ================= */
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

  if (!product) {
    return (
      <div className="p-10 text-center">
        Product not found
      </div>
    );
  }

  const image =
    product.media?.[0]?.url ||
    "/images/products.png";

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-screen flex items-center justify-center">

        {/* BACKGROUND IMAGE */}
        <img
          src={image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-5xl w-full px-6">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* PRODUCT IMAGE */}
            <div className="relative">
              <div
                className="
                  rounded-[2rem]
                  overflow-hidden
                  border
                  border-white/20
                  shadow-2xl
                  bg-white/10
                  backdrop-blur-2xl
                "
              >
                <img
                  src={image}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* FLOATING BADGE */}
              <div
                className="
                  absolute
                  top-5
                  left-5
                  bg-red-500
                  text-white
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  shadow-lg
                "
              >
                🔥 Trending Product
              </div>
            </div>

            {/* DETAILS */}
            <div className="space-y-6">

              <div>
                <p className="text-white/70 uppercase tracking-widest text-sm">
                  SWAGA STORE
                </p>

                <h1 className="text-5xl font-black leading-tight mt-3">
                  {product.name}
                </h1>
              </div>

              <p className="text-white/70 text-lg leading-relaxed">
                {product.description ||
                  "Premium quality product available now on SWAGA."}
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-4">

                <h2 className="text-4xl font-bold">
                  ₦
                  {Number(product.price || 0).toLocaleString()}
                </h2>

                <span
                  className="
                    bg-green-500/20
                    border
                    border-green-400/30
                    text-green-300
                    px-4
                    py-1
                    rounded-full
                    text-sm
                  "
                >
                  In Stock
                </span>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 pt-4">

                <Button
                  className="
                    px-8
                    py-6
                    text-lg
                    rounded-2xl
                    bg-white
                    text-black
                    hover:bg-gray-200
                  "
                >
                  Buy Now
                  <ArrowRight size={18} />
                </Button>

                <Button
                  onClick={copyLink}
                  className="
                    px-6
                    py-6
                    rounded-2xl
                    bg-white/10
                    border
                    border-white/20
                    backdrop-blur-xl
                  "
                >
                  <Copy size={18} />
                  Copy Link
                </Button>

              </div>

              {/* SHARE BUTTONS */}
              <div className="pt-6">

                <p className="text-white/70 mb-4">
                  Share this product
                </p>

                <div className="flex flex-wrap gap-4">

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="bg-green-500 hover:bg-green-600">
                      <MessageCircle size={18} />
                      WhatsApp
                    </Button>
                  </a>

                  <a
                    href={facebookLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="bg-blue-600 hover:bg-blue-700">
  <span className="font-semibold">
    Facebook
  </span>
</Button>
                  </a>

                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="bg-sky-500 hover:bg-sky-600">
                      <Send size={18} />
                      Telegram
                    </Button>
                  </a>

                </div>
              </div>

              {/* VIRAL COPY */}
              <Card
                className="
                  mt-8
                  bg-white/10
                  border
                  border-white/10
                  backdrop-blur-xl
                  rounded-3xl
                  p-6
                "
              >
                <div className="flex items-center gap-3 mb-4">
                  <Share2 size={18} />
                  <h3 className="font-semibold text-lg">
                    Viral Caption
                  </h3>
                </div>

                <p className="text-white/80 leading-relaxed">
                  🔥 Everybody is talking about this on SWAGA.
                  <br />
                  <br />
                  {product.name} now available for only ₦
                  {Number(product.price || 0).toLocaleString()}.
                  <br />
                  <br />
                  Fast delivery 🚚
                  <br />
                  Limited stock ⚡
                </p>

                <Button
                  onClick={copyLink}
                  className="mt-5"
                >
                  Copy Caption + Link
                </Button>
              </Card>

            </div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 text-center text-white/40 text-sm">
        © {new Date().getFullYear()} SWAGA — Social Commerce Platform
      </footer>

    </div>
  );
}