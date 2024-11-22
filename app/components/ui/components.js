import * as React from "react";

// Alert Component
export const Alert = ({ children, className = "", ...props }) => {
  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertTitle = ({ children, className = "", ...props }) => {
  return (
    <h5
      className={`mb-1 font-medium leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h5>
  );
};

export const AlertDescription = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`text-sm opacity-90 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Button Component
export const Button = React.forwardRef(({ 
  className = "",
  variant = "default",
  size = "default",
  children,
  ...props 
}, ref) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return "border border-gray-200 bg-white hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800";
      default:
        return "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "icon":
        return "h-10 w-10";
      default:
        return "h-10 px-4 py-2";
    }
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 ${getSizeClasses()} ${getVariantClasses()} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

// Card Components
export const Card = ({ className = "", ...props }) => {
  return (
    <div
      className={`rounded-lg border bg-white shadow-sm dark:bg-gray-950 ${className}`}
      {...props}
    />
  );
};

export const CardHeader = ({ className = "", ...props }) => {
  return (
    <div
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  );
};

export const CardTitle = ({ className = "", ...props }) => {
  return (
    <h3
      className={`text-2xl text-black font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
};

export const CardDescription = ({ className = "", ...props }) => {
  return (
    <p
      className={`text-sm text-gray-500 dark:text-black ${className}`}
      {...props}
    />
  );
};

export const CardContent = ({ className = "", ...props }) => {
  return (
    <div
      className={`p-6 pt-0 text-black ${className}`}
      {...props}
    />
  );
};

// Switch Component
export const Switch = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <button
      type="button"
      role="switch"
      className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-900 data-[state=unchecked]:bg-gray-200 dark:focus-visible:ring-gray-300 dark:data-[state=checked]:bg-gray-50 dark:data-[state=unchecked]:bg-gray-800 ${className}`}
      ref={ref}
      {...props}
    >
      <span
        className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-gray-950`}
      />
    </button>
  );
});

Switch.displayName = "Switch";

export default {
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Switch
};