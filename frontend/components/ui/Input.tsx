"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    floatingLabel?: string;
    onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, leftIcon, rightIcon, floatingLabel, onClear, value, onChange, placeholder, ...props }, ref) => {
        const [focused, setFocused] = React.useState(false);
        const hasValue = Boolean(value) || (typeof value === "number" && value === 0);
        const showFloatingLabel = floatingLabel && (focused || hasValue);

        return (
            <div className="relative w-full">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none">
                        {leftIcon}
                    </div>
                )}

                {floatingLabel && (
                    <label
                        className={cn(
                            "absolute left-3 font-body transition-all duration-200 pointer-events-none z-10",
                            leftIcon && "left-9",
                            showFloatingLabel
                                ? "top-0 -translate-y-1/2 scale-85 text-[var(--accent-primary)] bg-[var(--bg-secondary)] px-1 text-xs"
                                : "top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"
                        )}
                    >
                        {floatingLabel}
                    </label>
                )}

                <input
                    type={type}
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    onFocus={(e) => {
                        setFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setFocused(false);
                        props.onBlur?.(e);
                    }}
                    placeholder={floatingLabel && !focused ? "" : placeholder} /* Hide placeholder until focused if floating label */
                    className={cn(
                        "flex h-11 w-full rounded-[var(--radius-md)] border bg-[var(--bg-secondary)] px-3 py-2 text-base font-body text-[var(--text-primary)] transition-all duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--text-muted)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                        error
                            ? "border-[var(--error)] focus-visible:shadow-[0_0_0_3px_rgba(248,113,113,0.25)]"
                            : "border-[var(--border-default)] focus-visible:border-[var(--border-focus)] focus-visible:shadow-[0_0_0_3px_var(--accent-glow)]",
                        leftIcon && "pl-10",
                        (rightIcon || onClear) && "pr-10",
                        className
                    )}
                    {...props}
                />

                {/* Right side interactions */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-[var(--text-muted)]">
                    {onClear && hasValue && (
                        <button type="button" onClick={onClear} className="hover:text-[var(--text-primary)] transition-colors focus:outline-none">
                            <X className="h-4 w-4" />
                        </button>
                    )}
                    {!onClear && rightIcon && rightIcon}
                </div>
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
