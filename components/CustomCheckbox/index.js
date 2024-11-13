import React, { useState } from 'react';

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
      />
      <span className="checkbox-mark"></span>
      {label}
    </label>
  );
};

export default CustomCheckbox;