export default function ProductDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
        <div className="bg-neutral-200 rounded-xl aspect-square" />
        <div className="space-y-4">
          <div className="h-8 bg-neutral-200 rounded w-3/4" />
          <div className="h-6 bg-neutral-200 rounded w-1/4" />
          <div className="h-24 bg-neutral-200 rounded w-full" />
          <div className="h-12 bg-neutral-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}