

export function PageHeader({ title }: { title: string }) {
  return (
    <div className="mb-4">
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
}