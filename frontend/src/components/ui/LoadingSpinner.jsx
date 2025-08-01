
const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${sizeClasses[size]}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
