// Card Components
export const Card = ({ className = "", ...props }) => {
    return (
      <div
        className={`rounded-lg border bg-white shadow-sm dark:bg-gray-800 ${className}`}
        {...props}
      />
    );
  };
  
  export const CardHeader = ({ className = "", ...props }) => {
    return (
      <div
        className={`flex flex-col space-y-1.5 p-6 bg-gray-100 dark:bg-gray-900 ${className}`}
        {...props}
      />
    );
  };
  
  export const CardTitle = ({ className = "", ...props }) => {
    return (
      <h3
        className={`text-2xl font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100 ${className}`}
        {...props}
      />
    );
  };
  
  export const CardDescription = ({ className = "", ...props }) => {
    return (
      <p
        className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}
        {...props}
      />
    );
  };
  
  export const CardContent = ({ className = "", ...props }) => {
    return (
      <div
        className={`p-6 pt-0 bg-white dark:bg-gray-800 ${className}`}
        {...props}
      />
    );
  };