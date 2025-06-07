import * as React from "react";
import { cn } from "../../lib/utils";
import { type FieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional label for the input
  error?: FieldError; // Error object from react-hook-form
  leftIcon?: React.ReactNode; // Optional left-side icon
  rightIcon?: React.ReactNode; // Optional right-side icon (excluding password toggle)
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, leftIcon, rightIcon, ...props }, ref) => {
    const id = props.id || props.name;
    const [showPassword, setShowPassword] = React.useState(false);

    // Determine the actual input type based on password visibility
    const resolvedType = type === "password" && showPassword ? "text" : type;

    // Determine if a password toggle is needed
    const isPasswordInput = type === "password";

    return (
      <div className="space-y-1">
        {label && id && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 text-muted-foreground pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            type={resolvedType}
            className={cn(
        //          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10", // Add left padding if leftIcon is present
              rightIcon && "pr-10", // Add right padding if rightIcon is present
              isPasswordInput && "pr-10", // Always add right padding for password inputs to make space for toggle
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            ref={ref}
            id={id}
            {...props}
          />

          {/* Right Icon (if not password input, or if password input and no custom right icon) */}
          {rightIcon && !isPasswordInput && (
            <div className="absolute right-3 text-muted-foreground pointer-events-none">
              {rightIcon}
            </div>
          )}

          {/* Password Toggle Icon */}
          {isPasswordInput && (
            <button
              type="button" // Important: Prevent form submission
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-sm text-destructive mt-1">{error.message}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
