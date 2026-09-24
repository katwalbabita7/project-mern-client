"use client";

import ContactHero from "@/app/components/client/contact/ContactHero";
import ContactInfoCards from "@/app/components/client/contact/ContactInfoCards";
import ContactOfficeInfo from "@/app/components/client/contact/ContactOfficeInfo";
import FAQSection from "@/app/components/client/contact/FAQSection";
import ContactForm from "@/app/components/client/contact/ContactForm";

const ContactPage = () => {
  return (
    <div className="space-y-16 pb-20">
      <ContactHero />
      <ContactInfoCards />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-xs">
          <ContactForm />
          <ContactOfficeInfo />
        </div>
      </section>

      <FAQSection />
    </div>
  );
};

export default ContactPage;