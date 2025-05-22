import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface TabItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  active?: boolean;
}

interface TabNavigationProps {
  tabs: TabItem[];
  className?: string;
  variant?: "default" | "outline" | "underline";
  size?: "default" | "sm" | "lg";
  fullWidth?: boolean;
  scrollable?: boolean;
  onChange?: (href: string) => void;
}

export function TabNavigation({
  tabs,
  className,
  variant = "default",
  size = "default",
  fullWidth = false,
  scrollable = true,
  onChange,
}: TabNavigationProps) {
  const location = useLocation();
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [overflowTabs, setOverflowTabs] = useState<TabItem[]>([]);
  const [visibleTabs, setVisibleTabs] = useState<TabItem[]>(tabs);

  // Determine active tab based on current location
  const activeTab = tabs.find(
    (tab) => tab.active || tab.href === location.pathname
  );

  // Handle scroll visibility
  useEffect(() => {
    const checkScroll = () => {
      if (tabsRef.current && containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding errors
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [tabs, visibleTabs]);

  // Handle overflow tabs calculation
  useEffect(() => {
    if (!scrollable || !containerRef.current) {
      setVisibleTabs(tabs);
      setOverflowTabs([]);
      return;
    }

    const calculateVisibleTabs = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const tabElements = Array.from(
        container.querySelectorAll('[data-tab-item="true"]')
      );

      let availableWidth = containerWidth - 80; // Reserve space for overflow menu and scroll buttons
      let visibleCount = 0;

      for (let i = 0; i < tabElements.length; i++) {
        const tabWidth = (tabElements[i] as HTMLElement).offsetWidth;
        if (availableWidth - tabWidth >= 0) {
          availableWidth -= tabWidth;
          visibleCount++;
        } else {
          break;
        }
      }

      if (visibleCount < tabs.length) {
        setVisibleTabs(tabs.slice(0, visibleCount - 1)); // -1 to make room for overflow
        setOverflowTabs(tabs.slice(visibleCount - 1));
      } else {
        setVisibleTabs(tabs);
        setOverflowTabs([]);
      }
    };

    // Initial calculation
    calculateVisibleTabs();

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(calculateVisibleTabs);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [tabs, scrollable]);

  // Scroll handlers
  const scrollLeft = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Handle tab change
  const handleTabClick = (href: string) => {
    if (onChange) {
      onChange(href);
    }
  };

  // Tab styles based on variant and size
  const getTabStyles = (isActive: boolean, isDisabled: boolean) => {
    const baseStyles = "flex items-center gap-2 transition-all";

    const sizeStyles = {
      sm: "px-3 py-1 text-xs",
      default: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    const variantStyles = {
      default: isActive
        ? "bg-primary text-primary-foreground font-medium"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
      outline: isActive
        ? "bg-background border-primary border-b-2 font-medium"
        : "border-b border-transparent hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground",
      underline: isActive
        ? "border-b-2 border-primary font-medium"
        : "border-b-2 border-transparent hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground",
    };

    const disabledStyles = isDisabled
      ? "opacity-50 cursor-not-allowed pointer-events-none"
      : "cursor-pointer";

    return cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      disabledStyles
    );
  };

  const tabContainerStyles = cn(
    "flex items-center",
    variant === "default" && "bg-muted/50 rounded-lg p-1",
    fullWidth && "w-full",
    className
  );

  const tabListStyles = cn(
    "flex items-center gap-1",
    scrollable && "overflow-x-auto scrollbar-hide",
    fullWidth && "w-full"
  );

  return (
    <div className="relative" ref={containerRef}>
      <div className={tabContainerStyles}>
        {scrollable && showLeftScroll && (
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        )}

        <div className={tabListStyles} ref={tabsRef}>
          {visibleTabs.map((tab, index) => (
            <TabItem
              key={index}
              tab={tab}
              isActive={tab === activeTab}
              onClick={handleTabClick}
              className={getTabStyles(tab === activeTab, !!tab.disabled)}
              fullWidth={fullWidth && overflowTabs.length === 0}
            />
          ))}

          {overflowTabs.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={variant === "default" ? "secondary" : "ghost"}
                  size={size}
                  className={cn(
                    "flex items-center gap-1",
                    variant === "underline" && "border-b-2 border-transparent"
                  )}
                >
                  <MoreHorizontalIcon className="h-4 w-4" />

                  <span className="sr-only">More tabs</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {overflowTabs.map((tab, index) => (
                  <DropdownMenuItem key={index} disabled={tab.disabled} asChild>
                    <Link
                      to={tab.href}
                      className="flex items-center gap-2 w-full"
                      onClick={() => handleTabClick(tab.href)}
                    >
                      {tab.icon}
                      {tab.label}
                      {tab.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {tab.badge}
                        </Badge>
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {scrollable && showRightScroll && (
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

interface TabItemProps {
  tab: TabItem;
  isActive: boolean;
  onClick: (href: string) => void;
  className?: string;
  fullWidth?: boolean;
}

const TabItem = ({
  tab,
  isActive,
  onClick,
  className,
  fullWidth,
}: TabItemProps) => {
  if (tab.disabled) {
    return (
      <div
        className={cn(
          className,
          "flex-shrink-0",
          fullWidth && "flex-1 justify-center"
        )}
        data-tab-item="true"
      >
        {tab.icon}
        <span>{tab.label}</span>
        {tab.badge && (
          <Badge variant={isActive ? "secondary" : "outline"} className="ml-1">
            {tab.badge}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <Link
      to={tab.href}
      className={cn(
        className,
        "flex-shrink-0",
        fullWidth && "flex-1 justify-center"
      )}
      onClick={(e) => {
        if (tab.disabled) {
          e.preventDefault();
          return;
        }
        onClick(tab.href);
      }}
      aria-current={isActive ? "page" : undefined}
      data-tab-item="true"
    >
      {tab.icon}
      <span>{tab.label}</span>
      {tab.badge && (
        <Badge variant={isActive ? "secondary" : "outline"} className="ml-1">
          {tab.badge}
        </Badge>
      )}
    </Link>
  );
};
