import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, CreditCard, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";

interface NavItemType {
  label: string;
  icon: typeof LayoutDashboard;
  path: string;
};

const NAV_ITEMS: NavItemType[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Transactions", icon: CreditCard, path: "/transactions" },
  { label: "Customers", icon: Users, path: "/customers" },
];

interface SidebarHeaderProps {
  onClose: () => void;
};

function SidebarHeader({ onClose }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 pt-6">
      <div>
        <h1 className="text-base md:text-lg lg:text-xl font-bold text-[#16CA2E]">
          Vocagame
        </h1>
        <p className="mt-1 text-xs md:text-sm lg:text-base text-[#C7C4D7]">
          Real time dashboard
        </p>
      </div>

      <button
        onClick={onClose}
        className="text-white/60 hover:text-white lg:hidden"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

interface SidebarNavProps {
  onNavigate: (path: string) => void;
};

function SidebarNav({ onNavigate }: SidebarNavProps) {
  const location = useLocation();

  return (
    <nav className="mt-6 flex flex-col gap-1 px-4">
      {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
        const isActive = location.pathname === path;

        return (
          <button
            key={path}
            onClick={() => onNavigate(path)}
            className={cn(
              "relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
              isActive
                ? "bg-white/5 text-[#16CA2E]"
                : "text-white/60 hover:bg-white/5 hover:text-white",
            )}
          >
            {isActive && (
              <span className="absolute right-0 top-0 h-full w-0.5 bg-green-500" />
            )}
            <Icon className="h-4 w-4" />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

function SidebarFooter() {
  const email = useAuthStore((state) => state.email);

  return (
    <div className="flex items-center gap-3 border-t border-white/10 px-6 py-4">
      <img
        src="https://i.pravatar.cc/40?img=12"
        alt="avatar"
        className="h-9 w-9 rounded-full object-cover"
      />
      <div>
        <p className="text-xs font-normal text-[#E5E1E4]">{email}</p>
        <p className="text-xs font-normal text-[#E5E1E4]">user_root</p>
      </div>
    </div>
  );
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-white/10 transition-transform duration-200",
          "lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div>
          <SidebarHeader onClose={onClose} />
          <SidebarNav onNavigate={handleNavigate} />
        </div>

        <SidebarFooter />
      </aside>
    </>
  );
}
