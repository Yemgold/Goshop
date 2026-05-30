



// components/ui/PageHeader.tsx

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold">
        {title}
      </h1>

      {subtitle && (
        <p className="text-sm text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}