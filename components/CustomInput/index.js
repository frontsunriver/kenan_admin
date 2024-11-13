import React, { useState } from "react";

const CustomInput = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`custom-input-container ${className}`}>
      {label && (
        <label
          className={`custom-input-label ${
            isFocused || value ? "focused" : ""
          }`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`custom-input ${isFocused ? "focused" : ""}`}
      />
    </div>
  );
};

export default CustomInput;
