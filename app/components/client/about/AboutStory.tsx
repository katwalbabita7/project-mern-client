"use client";

import {
  LuShieldCheck,
  LuTruck,
  LuHeartHandshake,
  LuAward,
} from "react-icons/lu";

const AboutStory = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0058BE]">
            Our Journey & Purpose
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#091426] leading-tight">
            Building Nepal&apos;s Most Reliable E-Commerce Destination
          </h2>

          <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">
            Nepali Store was founded with a clear mission: to eliminate the
            common friction points of online shopping in Nepal. Too often,
            customers face misleading product photos, questionable authenticity,
            delayed shipments, or non-existent support.
          </p>

          <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">
            We arrange high-quality products directly from verified brands and
            trusted local suppliers. Whether you are looking for modern
            electronics, daily fashion, traditional craftsmanship, or lifestyle
            accessories, we ensure every product meets high standards before it
            reaches your hands.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <h4 className="font-bold text-[#091426] text-base mb-1">
                Our Mission
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                To provide every household in Nepal convenient access to genuine
                products with transparent pricing and swift delivery.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-teal-50 border border-teal-100">
              <h4 className="font-bold text-[#091426] text-base mb-1">
                Our Vision
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                To become Nepal&apos;s most customer-loved digital commerce
                ecosystem, uplifting local commerce and consumer trust.
              </p>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="relative">
          <div className="bg-linear-to-tr from-[#183055] to-[#0058BE] p-8 sm:p-10 rounded-2xl text-white shadow-xl space-y-6">
            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-white text-2xl font-bold border border-white/20">
              🇳🇵
            </div>

            <h3 className="text-2xl font-bold">Why Choose Nepali Store?</h3>

            <ul className="space-y-4 text-sm text-neutral-200">
              <li className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-white/10 shrink-0 mt-0.5">
                  <LuShieldCheck className="text-teal-300" size={16} />
                </div>
                <span>
                  <strong>Zero Counterfeits:</strong> Strict seller vetting and
                  rigorous quality inspection on all listed items.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-white/10 shrink-0 mt-0.5">
                  <LuTruck className="text-teal-300" size={16} />
                </div>
                <span>
                  <strong>Doorstep Delivery:</strong> Quick turnaround across
                  Kathmandu Valley and reliable nationwide express parcel
                  shipping.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-white/10 shrink-0 mt-0.5">
                  <LuHeartHandshake className="text-teal-300" size={16} />
                </div>
                <span>
                  <strong>Flexible Payment:</strong> Safe Cash on Delivery (COD),
                  plus smooth integration with digital wallets like eSewa and
                  Khalti.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-white/10 shrink-0 mt-0.5">
                  <LuAward className="text-teal-300" size={16} />
                </div>
                <span>
                  <strong>Customer Protection:</strong> Straightforward
                  replacement and return assistance for verified order issues.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;