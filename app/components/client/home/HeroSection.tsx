"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

const heroImages: string[] = [
  "/images/image2.avif",
  "/images/image1.jpg",
  "/images/fast-fashion-concept-with-full-clothing-store.jpg",
  "/images/fashionable-clothing-collection-modern-boutique-store-generated-by-ai.jpg",
];

export default function HeroSection() {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 min-h-[85vh] flex items-center">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Hero background ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6 text-center lg:text-left">
          <span className="inline-block bg-[#007472]/30 text-tertiary-300 border border-[#007472] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Exclusive Online Store
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Quality & Authenticity <br />
            <span className="text-secondary-300">At Your Fingertips</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-200 max-w-xl mx-auto lg:mx-0">
            Discover premium products from trusted brands. Fast delivery, unbeatable prices, and seamless shopping experience.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#0058BE] hover:bg-secondary-700 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Shop Now <LuArrowRight size={18} />
            </Link>
            <a
              href="#categories"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-md backdrop-blur-xs border border-white/20 transition-all"
            >
              Browse Categories
            </a>
          </div>
        </div>

        <div className="relative hidden lg:flex justify-center">
          <div className="relative w-96 h-96 rounded-2xl bg-white/5 backdrop-blur-md p-6 border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-[#007472]/30 flex items-center justify-center text-tertiary-300 text-3xl font-bold">
              NP
            </div>
            <h3 className="text-2xl font-bold text-white">Nepali Store</h3>
            <p className="text-sm text-neutral-300">
              Your reliable destination for verified products, great deals, and fast doorstep delivery.
            </p>
            <div className="flex gap-2">
              <span className="bg-white/10 text-xs px-3 py-1 rounded-full">Top Brands</span>
              <span className="bg-white/10 text-xs px-3 py-1 rounded-full">Fast Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === current ? "bg-white w-6" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}