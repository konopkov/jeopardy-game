import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  as?: "button" | "a" | "div";
}

export const Button = (props: ButtonProps) => {
  const { children, as: As = "button", ...restProps } = props;
  const commonClasses = [
    "inline-block",
    "rounded",
    "border",
    "px-12",
    "py-3",
    "text-sm",
    "font-medium",
    "border-2",
    "rounded-lg",
  ];

  const enabledClasses = [
    "border-white",
    "hover:bg-indigo-600",
    "hover:text-white",
    "focus:outline-none",
    "focus:ring",
    "active:bg-indigo-500",
  ];

  const disabledClasses = [
    "bg-gray-200",
    "border-gray-200",
    "text-gray-500",
    "cursor-not-allowed",
  ];

  const className = props.disabled
    ? [...commonClasses, ...disabledClasses].join(" ")
    : [...commonClasses, ...enabledClasses].join(" ");

  return (
    <As type="button" className={className} {...restProps}>
      {props.children}
    </As>
  );
};
