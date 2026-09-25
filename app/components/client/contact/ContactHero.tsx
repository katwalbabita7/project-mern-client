"use client";

const ContactHero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#091426] via-[#0f213f] to-[#0058BE] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
        <span className="inline-block bg-[#007472]/30 text-teal-300 border border-[#007472] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Customer Care & Support
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          We're Here to Help You
        </h1>
        <p className="text-sm sm:text-base text-neutral-200 max-w-2xl mx-auto">
          Have questions about an order, product inquiries, or feedback? Contact
          our dedicated support team in Biratnager anytime.
        </p>
      </div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0058BE]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#007472]/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default ContactHero;