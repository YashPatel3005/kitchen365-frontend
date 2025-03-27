import React from "react";

interface TextareaProps {
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean | string;
  hint?: string;
  name?: string;
  onBlur?: (e: React.FocusEvent<never, Element>) => void;
}

const TextArea: React.FC<TextareaProps> = ({
  placeholder = "Enter your message",
  rows = 3,
  value = "",
  onChange,
  className = "",
  disabled = false,
  error = false,
  name,
  onBlur,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  let textareaClasses = `rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-none ${className}`;

  if (disabled) {
    textareaClasses += ` bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed  `;
  } else if (error) {
    textareaClasses += ` bg-transparent text-gray-400 border-red-500 focus:border-red-300 focus:ring focus:ring-error-500/10 `;
  } else {
    textareaClasses += ` bg-transparent text-gray-400 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10 `;
  }

  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={textareaClasses}
        name={name}
        onBlur={onBlur}
      />
    </div>
  );
};

export default TextArea;
