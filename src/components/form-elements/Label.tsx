import React, { FC, ReactNode } from "react";

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

const Label: FC<LabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${className} mb-1.5 block text-sm font-medium text-gray-700 `}
    >
      {children}
    </label>
  );
};

export default Label;
