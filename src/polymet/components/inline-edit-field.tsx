import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, XIcon, PencilIcon } from "lucide-react";

export type InlineEditFieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "custom";

export interface SelectOption {
  label: string;
  value: string;
}

export interface InlineEditFieldProps {
  value: string | number;
  onChange: (value: string | number) => void;
  onCancel?: () => void;
  onSave?: (value: string | number) => void;
  type?: InlineEditFieldType;
  placeholder?: string;
  className?: string;
  viewClassName?: string;
  editClassName?: string;
  selectOptions?: SelectOption[];
  renderDisplay?: (value: string | number) => React.ReactNode;
  renderEdit?: (props: {
    value: string | number;
    onChange: (value: string | number) => void;
    onSave: () => void;
    onCancel: () => void;
  }) => React.ReactNode;
  displayIcon?: React.ReactNode;
  saveIcon?: React.ReactNode;
  cancelIcon?: React.ReactNode;
  editIcon?: React.ReactNode;
  showEditButton?: boolean;
  autoSave?: boolean;
  saveOnBlur?: boolean;
  disabled?: boolean;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  emptyValuePlaceholder?: string;
  validateValue?: (value: string | number) => boolean | string;
}

export function InlineEditField({
  value,
  onChange,
  onCancel,
  onSave,
  type = "text",
  placeholder = "Enter value",
  className,
  viewClassName,
  editClassName,
  selectOptions = [],
  renderDisplay,
  renderEdit,
  displayIcon,
  saveIcon = <CheckIcon className="h-4 w-4" />,

  cancelIcon = <XIcon className="h-4 w-4" />,

  editIcon = <PencilIcon className="h-4 w-4" />,

  showEditButton = true,
  autoSave = false,
  saveOnBlur = true,
  disabled = false,
  rows = 3,
  min,
  max,
  step,
  emptyValuePlaceholder = "—",
  validateValue,
}: InlineEditFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<string | number>(value);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();

      // If it's an input, select all text
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (disabled) return;
    setIsEditing(true);
    setEditValue(value);
    setValidationError(null);
  };

  const handleChange = (newValue: string | number) => {
    setEditValue(newValue);

    if (autoSave) {
      const isValid = validateAndSetError(newValue);
      if (isValid === true) {
        onChange(newValue);
      }
    }
  };

  const validateAndSetError = (valueToValidate: string | number): boolean => {
    if (validateValue) {
      const validationResult = validateValue(valueToValidate);
      if (validationResult !== true) {
        setValidationError(
          typeof validationResult === "string"
            ? validationResult
            : "Invalid value"
        );
        return false;
      }
    }
    setValidationError(null);
    return true;
  };

  const handleSave = () => {
    const isValid = validateAndSetError(editValue);

    if (isValid) {
      setIsEditing(false);
      onChange(editValue);
      onSave?.(editValue);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(value);
    setValidationError(null);
    onCancel?.();
  };

  const handleBlur = () => {
    if (saveOnBlur && !validationError) {
      handleSave();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && type !== "textarea") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const renderEditControl = () => {
    if (renderEdit) {
      return renderEdit({
        value: editValue,
        onChange: handleChange,
        onSave: handleSave,
        onCancel: handleCancel,
      });
    }

    switch (type) {
      case "textarea":
        return (
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={rows}
            className={cn("w-full", editClassName)}
          />
        );

      case "number":
        return (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="number"
            value={editValue}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            className={cn("w-full", editClassName)}
          />
        );

      case "select":
        return (
          <Select
            value={editValue.toString()}
            onValueChange={(value) => {
              handleChange(value);
              if (autoSave) {
                setIsEditing(false);
                onSave?.(value);
              }
            }}
          >
            <SelectTrigger className={cn("w-full", editClassName)}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "text":
      default:
        return (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editValue}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn("w-full", editClassName)}
          />
        );
    }
  };

  const renderDisplayValue = () => {
    if (renderDisplay) {
      return renderDisplay(value);
    }

    if (value === "" || value === null || value === undefined) {
      return (
        <span className="text-muted-foreground">{emptyValuePlaceholder}</span>
      );
    }

    if (type === "select" && selectOptions.length > 0) {
      const option = selectOptions.find(
        (opt) => opt.value === value.toString()
      );
      return option ? option.label : value;
    }

    return value;
  };

  if (isEditing) {
    return (
      <div className={cn("space-y-2", className)}>
        {renderEditControl()}

        {validationError && (
          <p className="text-xs text-red-500">{validationError}</p>
        )}

        {!autoSave && (
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="default"
              onClick={handleSave}
              className="h-8"
            >
              {saveIcon}
              <span className="ml-1">Save</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              className="h-8"
            >
              {cancelIcon}
              <span className="ml-1">Cancel</span>
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group flex items-center justify-between gap-2 rounded-md px-2 py-1.5 hover:bg-accent/50",
        disabled && "opacity-60 cursor-not-allowed hover:bg-transparent",
        className
      )}
    >
      <div
        className={cn("flex items-center gap-2 flex-1", viewClassName)}
        onClick={!disabled && !showEditButton ? handleEdit : undefined}
      >
        {displayIcon && (
          <span className="text-muted-foreground">{displayIcon}</span>
        )}
        <span
          className={cn(
            disabled
              ? "cursor-not-allowed"
              : !showEditButton
                ? "cursor-pointer"
                : ""
          )}
        >
          {renderDisplayValue()}
        </span>
      </div>

      {showEditButton && !disabled && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleEdit}
          className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
        >
          {editIcon}
        </Button>
      )}
    </div>
  );
}
