"use client";

import Link from "next/link";
import { LuArrowRight, LuPhoneCall } from "react-icons/lu";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#091426] via-[#0f213f] to-[#0058BE] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
        <span className="inline-block bg-[#007472]/30 text-teal-300 border border-[#007472] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
          About Nepali Store
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Empowering Shoppers Across Nepal With <br />
          <span className="text-secondary-400">Quality, Trust & Speed</span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-200 max-w-3xl mx-auto leading-relaxed">
          Nepali Store is an authentic online e-commerce platform committed to
          delivering genuine products, unbeatable value, and hassle-free shopping
          right to your doorstep across Nepal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#0058BE] hover:bg-secondary-700 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Explore Products <LuArrowRight size={18} />
          </Link>

          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-md backdrop-blur border border-white/20 transition-all"
          >
            Contact Our Team <LuPhoneCall size={18} />
          </Link>
        </div>
      </div>

      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0058BE]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#007472]/25 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default AboutHero;