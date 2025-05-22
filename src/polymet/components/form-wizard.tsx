import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon, CheckIcon } from "lucide-react";

export interface FormWizardStep {
  id: string;
  title: string;
  description?: string;
  isCompleted?: boolean;
  isOptional?: boolean;
  content: React.ReactNode;
}

export interface FormWizardProps {
  steps: FormWizardStep[];
  onComplete?: (data: any) => void;
  onStepChange?: (currentStepIndex: number, previousStepIndex: number) => void;
  initialStep?: number;
  className?: string;
  formData?: any;
  onFormDataChange?: (data: any) => void;
  showStepDescription?: boolean;
  showStepNumbers?: boolean;
  progressVariant?: "circles" | "bar" | "steps";
  navigationPosition?: "bottom" | "top" | "both";
  allowSkipToStep?: boolean;
}

export function FormWizard({
  steps,
  onComplete,
  onStepChange,
  initialStep = 0,
  className,
  formData: externalFormData,
  onFormDataChange,
  showStepDescription = true,
  showStepNumbers = true,
  progressVariant = "circles",
  navigationPosition = "bottom",
  allowSkipToStep = false,
}: FormWizardProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState(externalFormData || {});
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(
    {}
  );

  // Sync with external form data if provided
  useEffect(() => {
    if (externalFormData) {
      setFormData(externalFormData);
    }
  }, [externalFormData]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;

      // Mark current step as completed
      setCompletedSteps((prev) => ({
        ...prev,
        [steps[currentStep].id]: true,
      }));

      onStepChange?.(nextStep, currentStep);
      setCurrentStep(nextStep);
    } else {
      // Final step completion
      setCompletedSteps((prev) => ({
        ...prev,
        [steps[currentStep].id]: true,
      }));
      onComplete?.(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      onStepChange?.(prevStep, currentStep);
      setCurrentStep(prevStep);
    }
  };

  const handleStepClick = (index: number) => {
    if (
      allowSkipToStep ||
      index < currentStep ||
      completedSteps[steps[index].id]
    ) {
      onStepChange?.(index, currentStep);
      setCurrentStep(index);
    }
  };

  const updateFormData = (newData: any) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);
    onFormDataChange?.(updatedData);
  };

  const renderProgressBar = () => {
    return (
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300 ease-in-out"
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
          }}
        />
      </div>
    );
  };

  const renderProgressSteps = () => {
    return (
      <div className="flex items-center justify-between w-full mb-8">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep || completedSteps[step.id];
          const isClickable =
            allowSkipToStep || index <= currentStep || completedSteps[step.id];

          return (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center relative",
                isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"
              )}
              onClick={() => isClickable && handleStepClick(index)}
            >
              {/* Step connector line */}
              {index > 0 && (
                <div
                  className={cn(
                    "absolute h-[2px] top-4 -left-1/2 w-full -z-10",
                    isCompleted ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                  )}
                />
              )}

              {/* Step circle */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-gray-300 dark:border-gray-600 bg-background"
                )}
              >
                {isCompleted ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  showStepNumbers && <span>{index + 1}</span>
                )}
              </div>

              {/* Step title */}
              <div
                className={cn(
                  "mt-2 text-sm font-medium",
                  isActive
                    ? "text-primary"
                    : isCompleted
                      ? "text-primary"
                      : "text-muted-foreground"
                )}
              >
                {step.title}
              </div>

              {/* Step description */}
              {showStepDescription && step.description && (
                <div className="mt-1 text-xs text-muted-foreground max-w-[120px] text-center">
                  {step.description}
                </div>
              )}

              {/* Optional indicator */}
              {step.isOptional && (
                <div className="mt-1 text-xs text-muted-foreground">
                  (Optional)
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderStepsList = () => {
    return (
      <div className="flex flex-col space-y-2 w-full mb-6">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep || completedSteps[step.id];
          const isClickable =
            allowSkipToStep || index <= currentStep || completedSteps[step.id];

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center p-2 rounded-md",
                isActive ? "bg-accent" : "hover:bg-accent/50",
                isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"
              )}
              onClick={() => isClickable && handleStepClick(index)}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center mr-3",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isCompleted
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckIcon className="h-3 w-3" />
                ) : (
                  showStepNumbers && (
                    <span className="text-xs">{index + 1}</span>
                  )
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
                {showStepDescription && step.description && (
                  <span className="text-xs text-muted-foreground">
                    {step.description}
                  </span>
                )}
              </div>
              {isCompleted && (
                <CheckIcon className="h-4 w-4 ml-auto text-primary" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderNavigation = () => {
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    return (
      <div className="flex justify-between items-center mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstStep}
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </div>
        <Button onClick={handleNext}>
          {isLastStep ? "Complete" : "Next"}
          {!isLastStep && <ChevronRightIcon className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Progress indicator */}
      <div className="mb-8">
        {progressVariant === "circles" && renderProgressSteps()}
        {progressVariant === "bar" && renderProgressBar()}
        {progressVariant === "steps" && renderStepsList()}
      </div>

      {/* Top navigation */}
      {(navigationPosition === "top" || navigationPosition === "both") &&
        renderNavigation()}

      {/* Step content */}
      <div className="py-6">
        {React.isValidElement(steps[currentStep].content)
          ? React.cloneElement(
              steps[currentStep].content as React.ReactElement,
              {
                formData,
                updateFormData,
              }
            )
          : steps[currentStep].content}
      </div>

      {/* Bottom navigation */}
      {(navigationPosition === "bottom" || navigationPosition === "both") &&
        renderNavigation()}
    </div>
  );
}
