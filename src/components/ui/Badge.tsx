import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "warning" | "success";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium";
  const variantClasses: Record<string, string> = {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-200 text-gray-800",
    warning: "bg-red-100 text-red-800",
    success: "bg-green-100 text-green-800",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
