import { useState } from "react";
import { useNavigate } from "react-router";
import { Bell, Grid3x3, ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth.store";
import { useAlertStore } from "@/stores/alert.store";

interface NavbarProps {
  onMenuClick: () => void;
};

export default function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  
  const logout = useAuthStore((state) => state.logout);
  const email = useAuthStore((state) => state.email);
  const showAlert = useAlertStore((state) => state.showAlert);

  const handleLogout = async () => {
    setLoading(true);

    try {
      logout();
      showAlert("Berhasil logout", "success");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="flex items-center border-b border-white/20 p-5">
      <div className="flex flex-1 items-center">
        <button
          onClick={onMenuClick}
          className="text-white/60 hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button className="text-[#C7C4D7] hover:text-[#16CA2E]">
          <Bell className="h-5 w-5" />
        </button>

        <button className="text-[#C7C4D7] hover:text-[#16CA2E]">
          <Grid3x3 className="h-5 w-5" />
        </button>

        <div className="hidden h-5 w-px bg-white/10 sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 text-sm text-white/80 hover:text-white">
              <span className="hidden sm:inline">{email ?? "Account"}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-44 border-white/10 bg-[#131315] text-white"
          >
            <DropdownMenuItem className="cursor-pointer hover:bg-white/10">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-white/10">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={loading}
              className="cursor-pointer text-red-400 hover:bg-white/10"
            >
              {loading ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
