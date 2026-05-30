


import React from "react";

export type WhatsAppShareCardProps = {
  product: {
    id: string;
    name: string;
    description?: string;
    price?: string;
    image?: string;
    url: string;
  };
  messagePrefix?: string;
  className?: string;
};

const WhatsAppShareCard: React.FC<WhatsAppShareCardProps> = ({
  product,
  messagePrefix = "Check this out",
  className = "",
}) => {
  const text = `${messagePrefix}: ${product.name}`;

  const whatsappUrl =
    `https://wa.me/?text=${encodeURIComponent(text + " " + product.url)}`;

  return (
    <div
      className={`rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-white hover:shadow-lg transition ${className}`}
    >
      {/* Image */}
      <div className="w-full h-56 bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        )}

        {product.price && (
          <p className="text-base font-bold text-black">
            {product.price}
          </p>
        )}

        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 w-full text-center py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition"
        >
          Share on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default WhatsAppShareCard;
