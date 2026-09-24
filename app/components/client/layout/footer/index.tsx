"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LuPhone,
  LuMail,
  LuMapPin,
  LuClock,
  LuShieldCheck,
  LuTruck,
  LuRefreshCw,
  LuSend,
  LuHeart,
} from "react-icons/lu";
import toast from "react-hot-toast";

const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsSubscribed(true);
    toast.success("Thank you for subscribing to Nepali Store newsletter!");
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-[#091426] text-neutral-300 border-t border-neutral-800">
      
      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/*Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-linear-to-tr from-[#0058BE] to-[#007472] flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                NP
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">Nepali Store</span>
                <span className="block text-label-sm text-neutral-400 tracking-wider uppercase">Authentic Nepal Online</span>
              </div>
            </Link>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Your premier online shopping destination in Nepal. We connect shoppers with top local and international brands, offering unmatched quality, transparent pricing, and dependable doorstep delivery.
            </p>
          </div>

          {/*  Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/contact-us#faq" className="hover:text-white transition-colors">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact-us#delivery" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact-us#returns" className="hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/*  Contact & Office Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <LuMapPin className="text-secondary-400 shrink-0 mt-0.5" size={16} />
                <span className="text-neutral-400 hover:text-white transition">
                  Biratnagar, Nepal <br />(Koshi Province)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <LuPhone className="text-secondary-400 shrink-0" size={16} />
                <span className="text-neutral-400 hover:text-white transition">
                  +977-1-4567890 / 9801234567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <LuMail className="text-secondary-400 shrink-0" size={16} />
                <a href="mailto:support@nepalistore.com" className="text-neutral-400 hover:text-white transition break-all">
                  support@nepalistore.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <LuClock className="text-secondary-400 shrink-0 mt-0.5" size={16} />
                <span className="text-neutral-400 hover:text-white transition">
                  Sun - Fri: 9:00 AM - 7:00 PM <br />
                  <span className="text-xs text-neutral-500">Saturday: Closed</span>
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Payment Methods & Trust Bar */}
      <div className="border-t border-neutral-800/80 bg-[#060e1b] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-neutral-300">Accepted Payment Method:</span>
            <span className="bg-neutral-800 px-2.5 py-1 rounded text-neutral-300 border border-neutral-700">Cash on Delivery (COD)</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-400">
            <span>Designed with</span>
            <LuHeart className="text-red-500 inline fill-red-500" size={14} />
            <span>for Nepali Shoppers</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-neutral-800/50 bg-primary-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Nepali Store. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about-us" className="hover:text-neutral-300 transition">
              About Us
            </Link>
            <Link href="/contact-us" className="hover:text-neutral-300 transition">
              Contact Us
            </Link>
            <Link href="/contact-us#faq" className="hover:text-neutral-300 transition">
              Privacy Policy & Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;