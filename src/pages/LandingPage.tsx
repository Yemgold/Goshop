


import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";

/* ================= ANIMATION ================= */

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ================= CAROUSEL DATA ================= */

const slides = [
  { src: "/images/products.png", label: "Browse Products" },
  { src: "/images/orders.png", label: "Manage Orders" },
  { src: "/images/delivery.png", label: "Track Deliveries" },
];

const extendedSlides = [
  slides[slides.length - 1],
  ...slides,
  slides[0],
];

/* ================= GLASS CAROUSEL ================= */

function Carousel() {
  const [index, setIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;

    setProgress(0);

    const duration = 3000;
    const step = 50;

    const progressTimer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + (100 * step) / duration));
    }, step);

    const slideTimer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(slideTimer);
    };
  }, [index, paused]);

  useEffect(() => {
    if (index === extendedSlides.length - 1) {
      setTimeout(() => {
        setIsAnimating(false);
        setIndex(1);
      }, 400);
    }

    if (index === 0) {
      setTimeout(() => {
        setIsAnimating(false);
        setIndex(slides.length);
      }, 400);
    }
  }, [index]);

  useEffect(() => {
    if (!isAnimating) {
      const t = setTimeout(() => setIsAnimating(true), 50);
      return () => clearTimeout(t);
    }
  }, [isAnimating]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden max-w-4xl mx-auto"
    >
      {/* GLASS FRAME */}
      <div className="rounded-3xl p-4 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">

        {/* PROGRESS BAR */}
        <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* SLIDES */}
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={ref}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            const threshold = 60;

            if (info.offset.x < -threshold) {
              setIndex((p) => p + 1);
            } else if (info.offset.x > threshold) {
              setIndex((p) => p - 1);
            }
          }}
          animate={{ x: `-${index * 100}%` }}
          transition={
            isAnimating
              ? { type: "spring", stiffness: 120, damping: 18 }
              : { duration: 0 }
          }
        >
          {extendedSlides.map((s, i) => (
            <div key={i} className="min-w-full relative select-none">
              <img
                src={s.src}
                alt=""
                draggable={false}
                className="rounded-2xl shadow-xl"
              />

              {/* GLASS LABEL */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i + 1)}
              className={`h-2 w-2 rounded-full transition ${
                index === i + 1 ? "bg-white scale-125" : "bg-white/30"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

/* ================= ROLE CARD (GLASS) ================= */

function RoleCard({ title, route }: any) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -6 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(route)}
      className="p-6 rounded-2xl cursor-pointer 
                 bg-white/10 backdrop-blur-2xl 
                 border border-white/20 
                 shadow-xl hover:shadow-2xl transition"
    >
      <h3 className="font-semibold text-lg text-white">{title}</h3>
      <p className="text-white/70 text-sm mt-2">
        Start as a {title.toLowerCase()}
      </p>
    </motion.div>
  );
}

/* ================= FEATURE CARD ================= */

function FeatureCard({ title, desc }: any) {
  return (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg text-center">
      <h3 className="font-semibold text-lg text-white">{title}</h3>
      <p className="text-white/70 mt-2">{desc}</p>
    </div>
  );
}

/* ================= STEP CARD ================= */

function Step({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
      <h3 className="font-semibold text-lg text-white">{title}</h3>
      <p className="text-white/70 mt-2">{desc}</p>
    </div>
  );
}

/* ================= FAQ CARD ================= */

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
      <h4 className="font-semibold text-white">{q}</h4>
      <p className="text-white/70 mt-1">{a}</p>
    </div>
  );
}

/* ================= MAIN PAGE ================= */

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      {/* 🌈 BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black -z-10" />

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4 backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50">
        <h1 className="font-bold text-xl">GO-SHOPPING Platform</h1>

        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button onClick={() => navigate("/register")}>
            Get Started
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-24 px-6">

        <motion.h1
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="text-4xl md:text-6xl font-bold"
        >
          Buy, Sell & Deliver
          <span className="text-blue-400"> — All in One</span>
        </motion.h1>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="mt-6 text-white/70 max-w-xl mx-auto"
        >
          A unified platform for buyers, vendors, riders, and promoters.
        </motion.p>

        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={() => navigate("/register")}>
            Get Started
          </Button>
{/* .............................................................................................. */}
          <Button
  onClick={() => navigate("/buyer/home")}
  className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition"
>
  Continue as Buyer
</Button>

        </div>


        

        {/* GLASS CAROUSEL */}
        <div className="mt-14">
          <Carousel />
        </div>

      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="All-in-One" desc="Everything in one platform" />
          <FeatureCard title="Fast Delivery" desc="Real-time tracking system" />
          <FeatureCard title="Multi-Role System" desc="Switch anytime" />
        </div>
      </section>

             {/* ROLE CTA */}
       <section className="py-20 px-6 text-center">
  <h2 className="text-3xl font-bold mb-10">Choose Your Role</h2>

  <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
    <RoleCard title="Buyer" route="/buyer/home" />
    <RoleCard title="Vendor" route="/register?role=vendor" />
    <RoleCard title="Rider" route="/register?role=rider" />
    <RoleCard title="Promoter" route="/register?role=promoter" />
  </div>
</section>


 {/* HOW IT WORKS */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Step title="1. Sign Up" desc="Create account" />
          <Step title="2. Choose Role" desc="Select your role" />
          <Step title="3. Start Using" desc="Begin instantly" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">FAQ</h2>

        <div className="space-y-4">
          <FAQ q="Is it free?" a="Yes completely free" />
          <FAQ q="Can I switch roles?" a="Yes anytime" />
          <FAQ q="Delivery speed?" a="Very fast" />
        </div>
      </section>




      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold">Ready to start?</h2>

        <div className="mt-8">
          <Button onClick={() => navigate("/register")}>
            Create Account
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} GO-SHOPPING Platform
      </footer>

    </div>
  );
}



