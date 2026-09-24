const AboutStats = () => {
  const stats = [
    { value: "10K+", label: "Happy Customers", color: "text-[#0058BE]" },
    { value: "100%", label: "Authentic Items", color: "text-[#007472]" },
    { value: "50+", label: "Cities Covered", color: "text-[#0058BE]" },
    { value: "7 Days", label: "Customer Support", color: "text-[#007472]" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-white rounded-2xl border border-neutral-200 shadow-sm">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`text-center space-y-1 ${
              index !== 0 ? "border-l border-neutral-200" : ""
            }`}
          >
            <p className={`text-3xl sm:text-4xl font-extrabold ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-sm font-medium text-neutral-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutStats;