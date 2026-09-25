"use client";

import { useState } from "react";
import { LuCircleHelp } from "react-icons/lu";
import FAQItem from "./FAQItem";

const faqs = [
  {
    question:
      "How long does delivery take inside and outside Biratnagar City?",
    answer:
      "Inside Biratnagar City (Biratnagar, Itahari, Dharan), deliveries typically arrive within 24 to 48 hours. For locations outside the city, delivery takes 2 to 4 business days via our courier partners.",
  },
  {
    question: "What payment methods are supported on Nepali Store?",
    answer:
      "We offer Cash on Delivery (COD) for most locations across Nepal. In addition, we support digital payments via Khalti",
  },
  {
    question: "How do I check the status of my order?",
    answer:
      "You can check your order status by logging in and navigating to 'My Account' > 'My Orders'. You can also call or message our customer support with your Order ID for real-time tracking.",
  },
  {
    question: "What is the return and replacement policy?",
    answer:
      "We provide a 7-day hassle-free replacement or return window if your product is damaged during transit, defective, or different from the description. Reach out to support with your order details and photos.",
  },
  {
    question: "Can I partner with Nepali Store to sell my products?",
    answer:
      "Yes! We actively welcome verified Nepali brands, artisans, and suppliers. Select 'Vendor & Business Inquiries' in the contact form or email us at info@nepalistore.com.",
  },
];

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#007472]">
          <LuCircleHelp size={15} />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#091426]">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-neutral-500">
          Quick answers to common questions about orders, payments, and
          delivery.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openFaq === index}
            onToggle={() => setOpenFaq(openFaq === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;