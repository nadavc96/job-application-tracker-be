import { Search, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useLogout } from "@/hooks/useLogout";

export function Navbar() {
  const handleLogout = useLogout();

  return (
    <header className="border-b bg-background">
      <div className="h-14 sm:h-15 flex items-center justify-between px-4 sm:px-7 gap-3">
        <div className="flex items-center gap-4 sm:gap-8 min-w-0">
          <Link
            to={"/dashboard"}
            className="flex items-center gap-2 font-semibold text-sm shrink-0"
          >
            <div className="h-6.5 w-6.5 rounded-md bg-foreground flex items-center justify-center shrink-0">
              {/* logo mark */}
            </div>
            <span className="hidden xs:inline">Trackly</span>
          </Link>

          {/* Nav: scrolls horizontally instead of hiding on small screens */}
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            <Link
              to={"/dashboard"}
              className="px-3 py-1.5 rounded-md text-sm font-medium bg-muted whitespace-nowrap"
            >
              Dashboard
            </Link>
            <Link
              to={"/analytics"}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap"
            >
              Analytics
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search: inline from md up, moves below header on mobile */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies, roles..."
              className="pl-8 h-8"
            />
          </div>

          <Button size="sm" className="gap-1.5 px-2.5 sm:px-3">
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add Application</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 px-2.5 sm:px-3"
            onClick={handleLogout}
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
      </div>

      {/* Search row: only rendered below md */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies, roles..."
            className="pl-8 h-8 w-full"
          />
        </div>
      </div>
    </header>
  );
}
