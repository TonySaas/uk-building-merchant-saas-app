import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  badge?: React.ReactNode;
  collapsible?: boolean;
  required?: boolean;
  status?: "incomplete" | "complete" | "error" | "warning";
  onOpenChange?: (open: boolean) => void;
  id?: string;
}

export function FormSection({
  title,
  description,
  children,
  defaultOpen = true,
  icon,
  className,
  contentClassName,
  headerClassName,
  badge,
  collapsible = true,
  required = false,
  status,
  onOpenChange,
  id,
}: FormSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  const renderStatusIndicator = () => {
    if (!status) return null;

    return (
      <div className="ml-2">
        {status === "complete" && (
          <div className="w-2 h-2 rounded-full bg-green-500" />
        )}
        {status === "incomplete" && (
          <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
        )}
        {status === "error" && (
          <div className="w-2 h-2 rounded-full bg-red-500" />
        )}
        {status === "warning" && (
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
        )}
      </div>
    );
  };

  const renderContent = () => (
    <>
      <div
        className={cn(
          "flex items-center justify-between py-4",
          collapsible ? "cursor-pointer" : "",
          headerClassName
        )}
      >
        <div className="flex items-center">
          {icon && <div className="mr-3 text-muted-foreground">{icon}</div>}
          <div>
            <h3 className="text-lg font-medium flex items-center">
              {title}
              {required && (
                <span className="text-red-500 ml-1" aria-hidden="true">
                  *
                </span>
              )}
              {renderStatusIndicator()}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {badge && <div className="mr-3">{badge}</div>}
          {collapsible && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {isOpen ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>
      <div
        className={cn(
          "pb-4",
          contentClassName,
          !isOpen && collapsible ? "hidden" : ""
        )}
      >
        {children}
      </div>
    </>
  );

  if (collapsible) {
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={handleOpenChange}
        className={cn(
          "border rounded-lg p-4 mb-6",
          status === "error" && "border-red-500 bg-red-50 dark:bg-red-950/10",
          status === "warning" &&
            "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/10",
          status === "complete" &&
            "border-green-500 bg-green-50 dark:bg-green-950/10",
          !status && "border-border",
          className
        )}
        id={id}
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between py-4 cursor-pointer">
            <div className="flex items-center">
              {icon && <div className="mr-3 text-muted-foreground">{icon}</div>}
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  {title}
                  {required && (
                    <span className="text-red-500 ml-1" aria-hidden="true">
                      *
                    </span>
                  )}
                  {renderStatusIndicator()}
                </h3>
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              {badge && <div className="mr-3">{badge}</div>}
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {isOpen ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className={cn("pb-4", contentClassName)}>
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <div
      className={cn(
        "border rounded-lg p-4 mb-6",
        status === "error" && "border-red-500 bg-red-50 dark:bg-red-950/10",
        status === "warning" &&
          "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/10",
        status === "complete" &&
          "border-green-500 bg-green-50 dark:bg-green-950/10",
        !status && "border-border",
        className
      )}
      id={id}
    >
      {renderContent()}
    </div>
  );
}
