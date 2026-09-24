"use client";

import { LuMapPin } from "react-icons/lu";

const ContactOfficeInfo = () => {
  return (
    <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:border-l lg:border-neutral-200 lg:pl-10">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#091426]">
          Visit or Dispatch Center
        </h3>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Our main dispatch center operates from Biratnagar, coordinating
          deliveries across all major hubs in Nepal including Pokhara,
          Kathmandu, Chitwan, Butwal, and Dharan.
        </p>

        <div className="rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 p-6 text-center space-y-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0058BE] mx-auto shadow-xs">
            <LuMapPin size={24} />
          </div>
          <div>
            <h4 className="font-bold text-[#091426] text-sm">
              Biratnagar Fulfillment Center
            </h4>
            <p className="text-xs text-neutral-500">
              Roadcess Chowk, Ward No. 10, Biratnagar 44600
            </p>
          </div>
          <div className="pt-2">
            <span className="inline-block bg-white text-[#0058BE] text-xs font-semibold px-3 py-1 rounded-full border border-neutral-200 shadow-xs">
              🇳🇵 Shipping to All 77 Districts
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
        <h4 className="font-bold text-xs uppercase tracking-wider text-[#091426]">
          Need Immediate Help With An Active Order?
        </h4>
        <p className="text-xs text-neutral-600 leading-relaxed">
          For urgent order cancellations or delivery address changes, please
          call our direct helpline directly at{" "}
          <strong className="text-[#091426]">+977 9801234567</strong> for
          instant assistance.
        </p>
      </div>
    </div>
  );
};

export default ContactOfficeInfo;