interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({
  children,
}: SidebarProps) => {
  return (
    <aside className="w-1/4 border-r flex flex-col bg-stone-50">
      <div className="p-4 overflow-y-auto h-full">
        {children}
      </div>
    </aside>
  );
};

Sidebar.displayName = "Sidebar";

export { Sidebar };