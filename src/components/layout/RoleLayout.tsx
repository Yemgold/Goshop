
type Props = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export function RoleLayout({ sidebar, children }: Props) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {sidebar}

      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}