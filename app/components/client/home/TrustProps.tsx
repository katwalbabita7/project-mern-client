import { LuShieldCheck, LuTruck, LuRefreshCw, LuHeadphones } from "react-icons/lu";

export default function TrustProps() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-secondary-50 text-secondary-600 rounded-lg">
            <LuTruck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#091426]">Fast Delivery</h4>
            <p className="text-xs text-neutral-500">Speedy nationwide shipping</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-tertiary-50 text-tertiary-600 rounded-lg">
            <LuShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#091426]">100% Authentic</h4>
            <p className="text-xs text-neutral-500">Genuine verified products</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
            <LuRefreshCw size={24} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#091426]">Easy Returns</h4>
            <p className="text-xs text-neutral-500">Hassle-free return policy</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <LuHeadphones size={24} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#091426]">Support</h4>
            <p className="text-xs text-neutral-500">Friendly customer support</p>
          </div>
        </div>
      </div>
    </section>
  );
}