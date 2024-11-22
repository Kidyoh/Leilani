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