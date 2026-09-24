type FormSectionProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export default function FormSection({
  title,
  description,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <div className={`space-y-5 ${className}`}>
      {(title || description) && (
        <div className="mb-2">
          {title && (
            <h3 className="text-headline-sm text-primary-500">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-body-sm text-neutral-900/70">{description}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  );
}