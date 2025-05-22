import React, { forwardRef, InputHTMLAttributes } from "react";
import { InputBase, InputBaseProps } from "@/polymet/components/input-base";

export interface TextInputProps extends InputBaseProps {
  // Additional text-specific props can be added here
}
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type = "text", ...props }, ref) => {
    return <InputBase ref={ref} type={type} {...props} />;
  }
);

TextInput.displayName = "TextInput";

export { TextInput };
