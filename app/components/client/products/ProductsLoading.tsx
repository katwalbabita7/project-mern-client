export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg h-72 border border-neutral-200 animate-pulse"
        />
      ))}
    </div>
  );
}