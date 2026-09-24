"use client";

import { LuPhone, LuMail, LuMapPin, LuClock } from "react-icons/lu";

const ContactInfoCards = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Phone */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs hover:border-[#0058BE] transition space-y-3">
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0058BE] flex items-center justify-center">
            <LuPhone size={24} />
          </div>
          <h3 className="font-bold text-base text-[#091426]">Phone Support</h3>
          <p className="text-xs text-neutral-500">
            Call us directly during working hours
          </p>
          <div className="space-y-1 pt-1">
            <a
              href="tel:+97714567890"
              className="block text-sm font-semibold text-[#0058BE] hover:underline"
            >
              +977-1-4567890
            </a>
            <a
              href="tel:+9779801234567"
              className="block text-sm font-semibold text-[#0058BE] hover:underline"
            >
              +977 9801234567
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs hover:border-[#0058BE] transition space-y-3">
          <div className="w-12 h-12 rounded-lg bg-teal-50 text-[#007472] flex items-center justify-center">
            <LuMail size={24} />
          </div>
          <h3 className="font-bold text-base text-[#091426]">Email Support</h3>
          <p className="text-xs text-neutral-500">Send us your queries anytime</p>
          <div className="space-y-1 pt-1">
            <a
              href="mailto:support@nepalistore.com"
              className="block text-sm font-semibold text-[#007472] hover:underline break-all"
            >
              support@nepalistore.com
            </a>
            <a
              href="mailto:orders@nepalistore.com"
              className="block text-sm font-semibold text-[#007472] hover:underline break-all"
            >
              orders@nepalistore.com
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs hover:border-[#0058BE] transition space-y-3">
          <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <LuMapPin size={24} />
          </div>
          <h3 className="font-bold text-base text-[#091426]">Head Office</h3>
          <p className="text-xs text-neutral-500">Our central hub in Biratnagar</p>
          <p className="text-sm font-medium text-neutral-700 pt-1">
            Roadcess Chowk, Biratnagar <br />
            Koshi Province, Nepal
          </p>
        </div>

        {/* Hours */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs hover:border-[#0058BE] transition space-y-3">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <LuClock size={24} />
          </div>
          <h3 className="font-bold text-base text-[#091426]">Operating Hours</h3>
          <p className="text-xs text-neutral-500">Standard Nepal Time (NPT)</p>
          <p className="text-sm font-medium text-neutral-700 pt-1">
            Sunday – Friday <br />
            <span className="text-[#0058BE] font-semibold">9:00 AM – 7:00 PM</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoCards;