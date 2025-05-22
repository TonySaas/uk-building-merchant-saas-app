import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  SearchIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  SettingsIcon,
  UserIcon,
  LogOutIcon,
  HelpCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { OrganizationSwitcher } from "@/polymet/components/organization-switcher";

interface TopHeaderProps {
  onMobileMenuToggle: () => void;
  mobileMenuOpen?: boolean;
  userProfile?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  notifications?: {
    count: number;
    hasUnread: boolean;
  };
  onSearch?: (query: string) => void;
  className?: string;
  organizations?: Array<{
    id: string;
    name: string;
    logo: string;
  }>;
  currentOrganization?: string;
  onOrganizationChange?: (orgId: string) => void;
}

export function TopHeader({
  onMobileMenuToggle,
  mobileMenuOpen = false,
  userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
  },
  notifications = { count: 0, hasUnread: false },
  onSearch,
  className,
  organizations = [],
  currentOrganization,
  onOrganizationChange,
}: TopHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const userInitials = userProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 w-full items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container flex items-center justify-between px-4">
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileMenuToggle}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Organization Switcher - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex">
          {organizations.length > 0 && (
            <OrganizationSwitcher
              organizations={organizations}
              currentOrganizationId={currentOrganization}
              onOrganizationChange={onOrganizationChange}
            />
          )}
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex-1 md:mx-8 md:flex md:max-w-md"
        >
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Search"
          >
            <SearchIcon className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label={`Notifications ${
                  notifications.count > 0 ? `(${notifications.count} new)` : ""
                }`}
              >
                <BellIcon className="h-5 w-5" />

                {notifications.hasUnread && (
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                {notifications.count > 0 && (
                  <Badge variant="secondary">{notifications.count} new</Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {notifications.count > 0 ? (
                <>
                  <div className="max-h-80 overflow-y-auto">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <DropdownMenuItem key={i} className="cursor-pointer py-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`https://picsum.photos/seed/notification${i}/200`}
                              alt="Notification"
                            />

                            <AvatarFallback>N</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              New promotion approved
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Your summer promotion has been approved and is now
                              live.
                            </p>
                            <p className="text-xs text-muted-foreground">
                              2 minutes ago
                            </p>
                          </div>
                          {i === 0 && (
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="cursor-pointer justify-center text-sm font-medium text-primary">
                    View all notifications
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No new notifications
                  </p>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 rounded-full"
                aria-label="User menu"
              >
                <Avatar className="h-8 w-8">
                  {userProfile.avatar ? (
                    <AvatarImage
                      src={userProfile.avatar}
                      alt={userProfile.name}
                    />
                  ) : (
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  )}
                </Avatar>
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  {userProfile.avatar ? (
                    <AvatarImage
                      src={userProfile.avatar}
                      alt={userProfile.name}
                    />
                  ) : (
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium leading-none">
                    {userProfile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {userProfile.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />

                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />

                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircleIcon className="mr-2 h-4 w-4" />

                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOutIcon className="mr-2 h-4 w-4" />

                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
