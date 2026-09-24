"use client";

import { LuShieldCheck, LuUsers, LuStore } from "react-icons/lu";

const AboutValues = () => {
  const values = [
    {
      icon: <LuShieldCheck size={26} />,
      title: "Uncompromising Authenticity",
      description:
        "Every product listed on Nepali Store is sourced through authorized brand channels. We stand strictly against fake or sub-standard merchandise.",
      bg: "bg-blue-50",
      color: "text-[#0058BE]",
    },
    {
      icon: <LuUsers size={26} />,
      title: "Customer Centricity",
      description:
        "Your satisfaction is our north star. From intuitive browsing to seamless checkout, real-time order tracking, and helpful support, we put you first.",
      bg: "bg-teal-50",
      color: "text-[#007472]",
    },
    {
      icon: <LuStore size={26} />,
      title: "Promoting Nepali Enterprise",
      description:
        "We take immense pride in supporting Nepali artisans, local entrepreneurs, and emerging domestic manufacturers by featuring their products nationwide.",
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
  ];

  return (
    <section className="bg-neutral-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0058BE]">
            Our Foundation
          </span>
          <h2 className="text-3xl font-bold text-[#091426]">
            Core Values That Drive Us
          </h2>
          <p className="text-neutral-600 text-sm">
            We operate with clear principles that ensure customer delight and
            sustainable community impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4 hover:shadow-md transition"
            >
              <div
                className={`w-12 h-12 rounded-lg ${value.bg} ${value.color} flex items-center justify-center`}
              >
                {value.icon}
              </div>
              <h3 className="text-lg font-bold text-[#091426]">{value.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;