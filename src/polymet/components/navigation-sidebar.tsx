import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  HomeIcon,
  ShoppingCartIcon,
  UsersIcon,
  BarChartIcon,
  SettingsIcon,
  TagIcon,
  PackageIcon,
  BuildingIcon,
  LayersIcon,
  HelpCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  children?: NavItemProps[];
  collapsed?: boolean;
  depth?: number;
  onClick?: () => void;
}

interface NavigationSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
  organizationColor?: string;
  userType?: "supplier" | "merchant" | "admin";
}

const NavItem = ({
  icon,
  label,
  href,
  active,
  disabled,
  external,
  children,
  collapsed,
  depth = 0,
  onClick,
}: NavItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = (e: React.MouseEvent) => {
    if (children?.length) {
      e.preventDefault();
      setExpanded(!expanded);
    }
  };

  const hasChildren = children && children.length > 0;
  const indent = depth > 0 ? `pl-${depth * 4}` : "";

  const itemContent = (
    <div
      className={cn(
        "group flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium transition-all",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        indent
      )}
      onClick={disabled ? undefined : handleToggleExpand}
    >
      {icon && <div className="shrink-0 w-5 h-5">{icon}</div>}
      {!collapsed && <span className="truncate">{label}</span>}
      {!collapsed && hasChildren && (
        <div className="ml-auto">
          {expanded ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}
        </div>
      )}
    </div>
  );

  const wrappedItem = disabled ? (
    <div className="cursor-not-allowed">{itemContent}</div>
  ) : external ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {itemContent}
    </a>
  ) : (
    <Link to={href}>{itemContent}</Link>
  );

  return (
    <>
      {collapsed ? (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{wrappedItem}</TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            {label}
            {hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </Button>
            )}
          </TooltipContent>
        </Tooltip>
      ) : (
        wrappedItem
      )}

      {hasChildren && (expanded || collapsed) && (
        <div
          className={cn(
            "mt-1",
            collapsed
              ? "absolute left-full top-0 ml-1 w-48 rounded-md border bg-popover p-1 shadow-md"
              : ""
          )}
        >
          {children.map((child, index) => (
            <NavItem
              key={index}
              {...child}
              depth={collapsed ? 0 : depth + 1}
              collapsed={false}
            />
          ))}
        </div>
      )}
    </>
  );
};

// Navigation configurations based on user type
const getNavigationConfig = (userType: string = "admin") => {
  const commonItems = [
    {
      icon: <HomeIcon />,

      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <BarChartIcon />,

      label: "Analytics",
      href: "/analytics",
    },
    {
      icon: <SettingsIcon />,

      label: "Settings",
      href: "/settings",
    },
    {
      icon: <HelpCircleIcon />,

      label: "Help & Support",
      href: "/support",
    },
  ];

  const supplierItems = [
    {
      icon: <TagIcon />,

      label: "Promotions",
      href: "/promotions",
      children: [
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Create Promotion",
          href: "/promotions/create",
        },
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Active Promotions",
          href: "/promotions/active",
        },
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Scheduled",
          href: "/promotions/scheduled",
        },
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Archived",
          href: "/promotions/archived",
        },
      ],
    },
    {
      icon: <PackageIcon />,

      label: "Products",
      href: "/products",
      children: [
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Catalog",
          href: "/products/catalog",
        },
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Categories",
          href: "/products/categories",
        },
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Inventory",
          href: "/products/inventory",
        },
      ],
    },
    {
      icon: <BuildingIcon />,

      label: "Merchants",
      href: "/merchants",
    },
  ];

  const merchantItems = [
    {
      icon: <TagIcon />,

      label: "Offers",
      href: "/offers",
      children: [
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Available Offers",
          href: "/offers/available",
        },
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "My Selections",
          href: "/offers/selected",
        },
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Published",
          href: "/offers/published",
        },
      ],
    },
    {
      icon: <ShoppingCartIcon />,

      label: "Orders",
      href: "/orders",
    },
    {
      icon: <UsersIcon />,

      label: "Customers",
      href: "/customers",
    },
  ];

  const adminItems = [
    {
      icon: <BuildingIcon />,

      label: "Organizations",
      href: "/organizations",
      children: [
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Manage Organizations",
          href: "/organizations/manage",
        },
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Branding",
          href: "/organizations/branding",
        },
      ],
    },
    {
      icon: <UsersIcon />,

      label: "Users",
      href: "/users",
      children: [
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Suppliers",
          href: "/users/suppliers",
        },
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Merchants",
          href: "/users/merchants",
        },
        {
          icon: <div className="w-1 h-1 rounded-full bg-current" />,

          label: "Administrators",
          href: "/users/admins",
        },
      ],
    },
    {
      icon: <LayersIcon />,

      label: "Content",
      href: "/content",
    },
  ];

  switch (userType) {
    case "supplier":
      return [...supplierItems, ...commonItems];
    case "merchant":
      return [...merchantItems, ...commonItems];
    case "admin":
    default:
      return [...adminItems, ...commonItems];
  }
};

export default function NavigationSidebar({
  collapsed = false,
  onToggleCollapse,
  className,
  organizationColor = "#1E40AF", // Default blue color
  userType = "admin",
}: NavigationSidebarProps) {
  const location = useLocation();
  const navigationItems = getNavigationConfig(userType);

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
      style={{
        borderColor: `${organizationColor}20`, // 20% opacity border
      }}
    >
      <div className="flex h-14 items-center justify-between border-b px-3 py-2">
        <div
          className="flex items-center gap-2 font-semibold"
          style={{ color: organizationColor }}
        >
          {!collapsed && <span>BuildConnect</span>}
          <div
            className="h-6 w-6 rounded-sm"
            style={{ backgroundColor: organizationColor }}
          ></div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onToggleCollapse}
        >
          {collapsed ? (
            <ChevronRightIcon className="h-4 w-4" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {navigationItems.map((item, index) => (
            <NavItem
              key={index}
              {...item}
              active={
                location.pathname === item.href ||
                location.pathname.startsWith(`${item.href}/`)
              }
              collapsed={collapsed}
            />
          ))}
        </nav>
      </ScrollArea>

      <div
        className="mt-auto border-t p-2"
        style={{ borderColor: `${organizationColor}20` }}
      >
        <div
          className={cn(
            "rounded-md p-2",
            collapsed ? "flex justify-center" : "flex items-center gap-2"
          )}
          style={{ backgroundColor: `${organizationColor}10` }}
        >
          <div
            className="h-8 w-8 rounded-full bg-muted"
            style={{ border: `2px solid ${organizationColor}` }}
          />

          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-medium">Pro Plan</span>
              <span className="text-xs text-muted-foreground">
                {userType.charAt(0).toUpperCase() + userType.slice(1)} Account
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
