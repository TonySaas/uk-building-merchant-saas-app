import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SaveIcon, XIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export interface FormActionBarProps {
  children?: React.ReactNode;
  className?: string;
  position?: "top" | "bottom" | "both";
  sticky?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  saveIcon?: React.ReactNode;
  cancelIcon?: React.ReactNode;
  previousIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  showSave?: boolean;
  showCancel?: boolean;
  showPrevious?: boolean;
  showNext?: boolean;
  saveDisabled?: boolean;
  cancelDisabled?: boolean;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  saveVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  cancelVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  previousVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  nextVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  align?: "start" | "center" | "end" | "between" | "around" | "evenly";
  saving?: boolean;
}

export function FormActionBar({
  children,
  className,
  position = "bottom",
  sticky = true,
  onSave,
  onCancel,
  onPrevious,
  onNext,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  previousLabel = "Previous",
  nextLabel = "Next",
  saveIcon = <SaveIcon className="mr-2 h-4 w-4" />,

  cancelIcon = <XIcon className="mr-2 h-4 w-4" />,

  previousIcon = <ArrowLeftIcon className="mr-2 h-4 w-4" />,

  nextIcon = <ArrowRightIcon className="ml-2 h-4 w-4" />,

  showSave = true,
  showCancel = true,
  showPrevious = false,
  showNext = false,
  saveDisabled = false,
  cancelDisabled = false,
  previousDisabled = false,
  nextDisabled = false,
  saveVariant = "default",
  cancelVariant = "outline",
  previousVariant = "outline",
  nextVariant = "default",
  align = "end",
  saving = false,
}: FormActionBarProps) {
  const alignClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const renderActionBar = () => (
    <div
      className={cn(
        "py-4 px-6 flex flex-wrap items-center gap-3",
        alignClasses[align],
        className
      )}
    >
      {children}

      {showPrevious && (
        <Button
          variant={previousVariant}
          onClick={onPrevious}
          disabled={previousDisabled}
        >
          {previousIcon}
          {previousLabel}
        </Button>
      )}

      {showCancel && (
        <Button
          variant={cancelVariant}
          onClick={onCancel}
          disabled={cancelDisabled || saving}
        >
          {cancelIcon}
          {cancelLabel}
        </Button>
      )}

      {showSave && (
        <Button
          variant={saveVariant}
          onClick={onSave}
          disabled={saveDisabled || saving}
        >
          {saveIcon}
          {saving ? "Saving..." : saveLabel}
        </Button>
      )}

      {showNext && (
        <Button variant={nextVariant} onClick={onNext} disabled={nextDisabled}>
          {nextLabel}
          {nextIcon}
        </Button>
      )}
    </div>
  );

  const stickyClasses = sticky
    ? "sticky z-10 bg-background border shadow-sm"
    : "";

  const topClasses = cn(
    stickyClasses,
    sticky && position === "top" ? "top-0" : "",
    "border-b"
  );

  const bottomClasses = cn(
    stickyClasses,
    sticky && position === "bottom" ? "bottom-0" : "",
    "border-t"
  );

  return (
    <>
      {(position === "top" || position === "both") && (
        <div className={topClasses}>{renderActionBar()}</div>
      )}

      {position === "both" && <Separator className="my-4" />}

      {(position === "bottom" || position === "both") && (
        <div className={bottomClasses}>{renderActionBar()}</div>
      )}
    </>
  );
}
