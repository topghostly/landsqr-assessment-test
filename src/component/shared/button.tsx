import React from "react";

export interface BtnProp {
  children: React.ReactNode;
  type: "submit" | "reset" | "button" | undefined;
  color?: "primary" | "secondary";
  variant: "fill" | "outline" | "text";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  fullWidth?: boolean;
  customClass?: React.CSSProperties;
}
const Button: React.FC<BtnProp> = ({
  children,
  variant,
  fullWidth,
  onClick,
  customClass,
  type,
  color,
}) => {
  return (
    <button
      className={`btn ${color} ${variant} ${fullWidth ? "fw" : null} `}
      style={{ ...customClass }}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
