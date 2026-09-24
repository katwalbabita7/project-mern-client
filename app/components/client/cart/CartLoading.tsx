export default function CartLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-8 bg-neutral-200 rounded w-48 mb-8 animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 bg-neutral-100 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-neutral-100 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}