import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircleIcon, CheckCircleIcon } from "lucide-react";

interface FormErrorHandlerProps {
  onDismiss?: () => void;
  onRetry?: () => void;
  errorMessage?: string;
  showButtons?: boolean;
}

export default function FormErrorHandler({
  onDismiss,
  onRetry,
  errorMessage = "We encountered an error while processing your form.",
  showButtons = true,
}: FormErrorHandlerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <Card className="bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <AlertCircleIcon className="h-12 w-12 text-red-500 mb-4" />

          <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
            Form Validation Error
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {errorMessage}
          </p>

          {showButtons && (
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={handleDismiss}
                className="w-full sm:w-auto"
              >
                Dismiss
              </Button>
              <Button
                onClick={handleRetry}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
