import type React from "react";
import type { FC, ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
    id?: string;
    name?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    success?: boolean;
    error?: boolean;
    hint?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    onStartIconClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
    onEndIconClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
    iconClassName?: string;
    ariaDescribedby?: string;
}

const Input: FC<InputProps> = ({
    type = "text",
    id,
    name,
    placeholder,
    className = "",
    disabled = false,
    success = false,
    error = false,
    hint,
    startIcon,
    endIcon,
    onStartIconClick,
    onEndIconClick,
    iconClassName = "",
    ariaDescribedby,
    ...props
}) => {
    let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

    // ajustar padding si hay iconos para evitar solapamiento
    if (startIcon) inputClasses = inputClasses.replace('px-4', 'pl-10 pr-4');
    if (endIcon) inputClasses = inputClasses.replace('px-4', 'pl-4 pr-10');
    if (startIcon && endIcon) inputClasses = inputClasses.replace('px-4', 'pl-10 pr-10');

    if (disabled) {
        inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
    } else if (error) {
        inputClasses += `  border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
    } else if (success) {
        inputClasses += `  border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
    } else {
        inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
    }

    return (
        <div>
            <div className="relative">
                {startIcon && (
                    <span
                        className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 ${iconClassName} ${disabled ? 'opacity-40' : 'cursor-pointer'}`}
                        onClick={(e) => {
                            if (disabled) return;
                            if (typeof onStartIconClick === 'function') onStartIconClick(e);
                        }}
                        role={onStartIconClick ? 'button' : undefined}
                        tabIndex={onStartIconClick ? 0 : undefined}
                    >
                        {startIcon}
                    </span>
                )}
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={inputClasses}
                    aria-describedby={ariaDescribedby}
                    {...props}
                />
                {endIcon && (
                    <span
                        className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 ${iconClassName} ${disabled ? 'opacity-40' : 'cursor-pointer'}`}
                        onClick={(e) => {
                            if (disabled) return;
                            if (typeof onEndIconClick === 'function') onEndIconClick(e);
                        }}
                        role={onEndIconClick ? 'button' : undefined}
                        tabIndex={onEndIconClick ? 0 : undefined}
                    >
                        {endIcon}
                    </span>
                )}
            </div>
            {hint && (
                <p
                    id={ariaDescribedby}
                    role="alert"
                    className={`mt-1.5 text-xs ${error
                        ? "text-error-500"
                        : success
                            ? "text-success-500"
                            : "text-gray-500"
                        }`}
                >
                    {hint}
                </p>
            )}
        </div>
    );
};

export default Input;
