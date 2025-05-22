import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  SearchIcon,
  MenuIcon,
  XIcon,
  BellIcon,
  UserIcon,
  BarChartIcon,
  SettingsIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface MobileNavigationItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  children?: MobileNavigationItem[];
}

interface MobileNavigationProps {
  items?: MobileNavigationItem[];
  userProfile?: {
    name: string;
    email?: string;
    avatar?: string;
    role?: string;
  };
  organizationName?: string;
  organizationLogo?: string;
  variant?: "drawer" | "bottom-bar";
  className?: string;
  onNavigate?: (href: string) => void;
}

export function MobileNavigation({
  items = defaultNavigationItems,
  userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
  },
  organizationName = "BuildConnect",
  organizationLogo,
  variant = "drawer",
  className,
  onNavigate,
}: MobileNavigationProps) {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleNavigation = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    }
    setIsDrawerOpen(false);
  };

  const userInitials = userProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Drawer Navigation
  const renderDrawerNavigation = () => (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[300px]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              {organizationLogo ? (
                <img
                  src={organizationLogo}
                  alt={organizationName}
                  className="h-8 w-8 rounded-md object-contain"
                />
              ) : (
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {organizationName.charAt(0)}
                </div>
              )}
              <span className="font-semibold">{organizationName}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close menu"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                {userProfile.avatar ? (
                  <AvatarImage
                    src={userProfile.avatar}
                    alt={userProfile.name}
                  />
                ) : (
                  <AvatarFallback>{userInitials}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-medium">{userProfile.name}</p>
                {userProfile.email && (
                  <p className="text-xs text-muted-foreground">
                    {userProfile.email}
                  </p>
                )}
                {userProfile.role && (
                  <p className="text-xs text-muted-foreground">
                    {userProfile.role}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {items.map((item, index) => (
                <NavItem
                  key={index}
                  item={item}
                  isActive={location.pathname === item.href}
                  isOpen={!!openSections[item.label]}
                  toggleSection={() => toggleSection(item.label)}
                  onNavigate={handleNavigation}
                />
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/settings">
                <SettingsIcon className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  // Bottom Bar Navigation
  const renderBottomBarNavigation = () => {
    // Limit to 5 items for bottom bar
    const bottomBarItems = items.slice(0, 5);

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden z-50">
        <div className="flex items-center justify-around">
          {bottomBarItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex flex-col items-center py-3 px-2 flex-1",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
              onClick={() => handleNavigation(item.href)}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("md:hidden", className)}>
      {variant === "drawer"
        ? renderDrawerNavigation()
        : renderBottomBarNavigation()}
    </div>
  );
}

interface NavItemProps {
  item: MobileNavigationItem;
  isActive: boolean;
  isOpen: boolean;
  toggleSection: () => void;
  onNavigate: (href: string) => void;
  depth?: number;
}

const NavItem = ({
  item,
  isActive,
  isOpen,
  toggleSection,
  onNavigate,
  depth = 0,
}: NavItemProps) => {
  const hasChildren = item.children && item.children.length > 0;
  const indentClass = depth > 0 ? `pl-${depth * 4}` : "";

  return (
    <div>
      <div
        className={cn(
          "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
          isActive ? "bg-primary/10 text-primary" : "hover:bg-accent",
          indentClass
        )}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            toggleSection();
          } else {
            onNavigate(item.href);
          }
        }}
      >
        <Link
          to={item.href}
          className="flex items-center flex-1"
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
            } else {
              onNavigate(item.href);
            }
          }}
        >
          <span className="mr-3">{item.icon}</span>
          <span>{item.label}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-auto mr-2">
              {item.badge}
            </Badge>
          )}
        </Link>
        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={(e) => {
              e.stopPropagation();
              toggleSection();
            }}
          >
            <ChevronRightIcon
              className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "rotate-90"
              )}
            />
          </Button>
        )}
      </div>

      {/* Render children if expanded */}
      {hasChildren && isOpen && (
        <div className="mt-1">
          {item.children!.map((child, index) => (
            <NavItem
              key={index}
              item={child}
              isActive={false}
              isOpen={false}
              toggleSection={() => {}}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Default navigation items
const defaultNavigationItems: MobileNavigationItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    label: "Search",
    href: "/search",
    icon: <SearchIcon className="h-5 w-5" />,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: <BarChartIcon className="h-5 w-5" />,

    children: [
      {
        label: "Dashboard",
        href: "/analytics/dashboard",
        icon: <HomeIcon className="h-5 w-5" />,
      },
      {
        label: "Reports",
        href: "/analytics/reports",
        icon: <BarChartIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: <BellIcon className="h-5 w-5" />,

    badge: 3,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <UserIcon className="h-5 w-5" />,
  },
];
