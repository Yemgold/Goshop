




import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";

interface Props {
  totalProducts: number;
}

const MarketplaceHero: React.FC<Props> = ({ totalProducts }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r
                 from-black via-gray-900 to-gray-800
                 text-white p-8 md:p-12 shadow-2xl"
    >
      {/* Decorative circles */}
      <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        {/* LEFT */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur">
            <Sparkles size={16} />
            <span className="text-sm font-medium">
              Welcome to gO-Shopping Marketplace
            </span>
          </div>

          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold leading-tight">
            Discover Amazing
            <br />
            Products Near You
          </h1>

          <p className="mt-5 text-gray-300 text-lg max-w-xl">
            Shop thousands of products from trusted vendors across
            Nigeria. Enjoy secure shopping, fast delivery and the
            best prices every day.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-6">
            <div>
              <p className="text-3xl font-bold">{totalProducts}+</p>
              <span className="text-gray-300 text-sm">
                Products
              </span>
            </div>

            <div>
              <p className="text-3xl font-bold">100%</p>
              <span className="text-gray-300 text-sm">
                Secure Shopping
              </span>
            </div>

            <div>
              <p className="text-3xl font-bold">24/7</p>
              <span className="text-gray-300 text-sm">
                Customer Support
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex justify-center">
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="w-72 h-72 rounded-full
                       bg-white/10 backdrop-blur-lg
                       border border-white/20
                       flex items-center justify-center"
          >
            <ShoppingBag size={140} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default MarketplaceHero;