import Link from "next/link";

const AboutCTA = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-linear-to-r from-[#183055] to-[#0058BE] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl sm:text-3xl font-bold">
            Ready to Experience Nepali Store?
          </h3>
          <p className="text-neutral-200 text-sm max-w-xl">
            Explore thousands of curated products from trusted brands. Fast
            delivery, Cash on Delivery, and top-tier customer service await you.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/products"
            className="bg-white text-[#091426] hover:bg-neutral-100 font-bold px-6 py-3 rounded-md text-sm transition shadow"
          >
            Start Shopping Now
          </Link>
          <Link
            href="/contact-us"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-md text-sm transition"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;