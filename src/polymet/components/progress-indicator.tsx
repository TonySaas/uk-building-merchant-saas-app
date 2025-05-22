import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckCircleIcon,
  XCircleIcon,
  CircleIcon,
  ArrowRightIcon,
} from "lucide-react";

const progressIndicatorVariants = cva("flex items-center", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    size: {
      sm: "gap-2",
      default: "gap-3",
      lg: "gap-4",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "default",
  },
});

export interface ProgressStep {
  id: string;
  label: string;
  description?: string;
  status: "complete" | "current" | "upcoming" | "error";
}

export interface ProgressIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressIndicatorVariants> {
  steps: ProgressStep[];
  currentStep?: string;
  showLabels?: boolean;
  showConnectors?: boolean;
  showIcons?: boolean;
}

export function ProgressIndicator({
  className,
  orientation,
  size,
  steps,
  currentStep,
  showLabels = true,
  showConnectors = true,
  showIcons = true,
  ...props
}: ProgressIndicatorProps) {
  // Update step status based on currentStep if provided
  const processedSteps = React.useMemo(() => {
    if (!currentStep) return steps;

    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex === -1) return steps;

    return steps.map((step, index) => {
      if (step.status === "error") return step; // Keep error status
      if (index < currentIndex) return { ...step, status: "complete" };
      if (index === currentIndex) return { ...step, status: "current" };
      return { ...step, status: "upcoming" };
    });
  }, [steps, currentStep]);

  // Get icon based on step status
  const getStepIcon = (status: string) => {
    switch (status) {
      case "complete":
        return (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircleIcon className="h-5 w-5" />
          </div>
        );

      case "current":
        return (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <CircleIcon className="h-5 w-5" />
          </div>
        );

      case "error":
        return (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <XCircleIcon className="h-5 w-5" />
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
            <CircleIcon className="h-5 w-5" />
          </div>
        );
    }
  };

  // Get connector style based on step status
  const getConnectorStyle = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-500 dark:bg-green-400";
      case "current":
        return "bg-blue-500 dark:bg-blue-400";
      case "error":
        return "bg-red-500 dark:bg-red-400";
      default:
        return "bg-gray-200 dark:bg-gray-700";
    }
  };

  return (
    <div
      className={cn(
        progressIndicatorVariants({ orientation, size }),
        className
      )}
      {...props}
    >
      {processedSteps.map((step, index) => {
        const isLast = index === processedSteps.length - 1;

        return (
          <div
            key={step.id}
            className={cn(
              "flex",
              orientation === "horizontal"
                ? "flex-col items-center"
                : "flex-row items-start",
              "relative"
            )}
          >
            {/* Step indicator */}
            <div className="flex items-center">
              {showIcons ? (
                getStepIcon(step.status)
              ) : (
                <div
                  className={cn(
                    "w-3 h-3 rounded-full",
                    step.status === "complete" &&
                      "bg-green-500 dark:bg-green-400",
                    step.status === "current" && "bg-blue-500 dark:bg-blue-400",
                    step.status === "error" && "bg-red-500 dark:bg-red-400",
                    step.status === "upcoming" && "bg-gray-300 dark:bg-gray-600"
                  )}
                />
              )}
            </div>

            {/* Connector line */}
            {showConnectors && !isLast && (
              <div
                className={cn(
                  orientation === "horizontal"
                    ? "absolute left-[calc(50%+12px)] top-3 h-[1px] w-[calc(100%-24px)]"
                    : "absolute left-3 top-6 h-[calc(100%-24px)] w-[1px]",
                  getConnectorStyle(step.status)
                )}
              />
            )}

            {/* Label and description */}
            {showLabels && (
              <div
                className={cn(
                  "flex flex-col",
                  orientation === "horizontal"
                    ? "items-center mt-2 text-center"
                    : "ml-3"
                )}
              >
                <span
                  className={cn(
                    "text-sm font-medium",
                    step.status === "current" &&
                      "text-blue-700 dark:text-blue-400",
                    step.status === "error" && "text-red-700 dark:text-red-400",
                    step.status === "upcoming" &&
                      "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {step.description}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export interface LinearProgressIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  steps: ProgressStep[];
  currentStep?: string;
  showStepIndicators?: boolean;
  showLabels?: boolean;
}

export function LinearProgressIndicator({
  className,
  steps,
  currentStep,
  showStepIndicators = true,
  showLabels = false,
  ...props
}: LinearProgressIndicatorProps) {
  // Find current step index
  const currentIndex = currentStep
    ? steps.findIndex((step) => step.id === currentStep)
    : steps.findIndex((step) => step.status === "current");

  // Calculate progress percentage
  const progress =
    currentIndex >= 0 ? (currentIndex / (steps.length - 1)) * 100 : 0;

  // Check if any step has error status
  const hasError = steps.some((step) => step.status === "error");

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
        <div
          className={cn(
            "absolute left-0 top-0 h-full transition-all duration-500 ease-in-out rounded-full",
            hasError
              ? "bg-red-500 dark:bg-red-400"
              : "bg-blue-500 dark:bg-blue-400"
          )}
          style={{ width: `${progress}%` }}
        />

        {/* Step indicators */}
        {showStepIndicators && (
          <div className="absolute inset-0 flex items-center justify-between px-1">
            {steps.map((step, index) => {
              const isComplete =
                index < currentIndex ||
                (index === currentIndex && step.status === "complete");
              const isCurrent =
                index === currentIndex && step.status === "current";
              const isError = step.status === "error";

              return (
                <div
                  key={step.id}
                  className={cn(
                    "w-3 h-3 rounded-full z-10",
                    isComplete && "bg-green-500 dark:bg-green-400",
                    isCurrent &&
                      "bg-blue-500 dark:bg-blue-400 ring-2 ring-blue-200 dark:ring-blue-900",
                    isError &&
                      "bg-red-500 dark:bg-red-400 ring-2 ring-red-200 dark:ring-red-900",
                    !isComplete &&
                      !isCurrent &&
                      !isError &&
                      "bg-gray-300 dark:bg-gray-600"
                  )}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Labels */}
      {showLabels && (
        <div className="flex justify-between px-1">
          {steps.map((step, index) => {
            const isComplete =
              index < currentIndex ||
              (index === currentIndex && step.status === "complete");
            const isCurrent =
              index === currentIndex && step.status === "current";
            const isError = step.status === "error";

            return (
              <div
                key={step.id}
                className={cn(
                  "text-xs",
                  isComplete && "text-green-700 dark:text-green-400",
                  isCurrent && "text-blue-700 dark:text-blue-400 font-medium",
                  isError && "text-red-700 dark:text-red-400 font-medium",
                  !isComplete &&
                    !isCurrent &&
                    !isError &&
                    "text-gray-500 dark:text-gray-400"
                )}
              >
                {step.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
