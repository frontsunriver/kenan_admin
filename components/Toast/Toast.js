import React from "react";

import {
  SuccessIcon,
  FailureIcon,
  WarningIcon,
  CloseIcon,
  PrimaryIcon,
} from "../Icons/Icons";

const Toast = ({ title = "", message, type, onClose }) => {
  const iconMap = {
    success: <SuccessIcon />,
    failure: <FailureIcon />,
    warning: <WarningIcon />,
    primary: <PrimaryIcon />,
  };

  const toastIcon = iconMap[type] || null;

  const handleShowClose = () => {
    switch (type) {
      case "success":
        return <CloseIcon color="#33363F" />;
      case "failure":
        return <CloseIcon color="#5A1A1A" />;
      case "warning":
        return <CloseIcon color="#7D503B" />;
      case "primary":
        return <CloseIcon color="#FFF" />;
      default:
        return <CloseIcon color="#000" />;
    }
  };

  return (
    <div className={`custom-toast toast--${type}`} role="alert">
      <div className="toast-message">
        {toastIcon && (
          <div className="icon icon--lg icon--thumb">{toastIcon}</div>
        )}
        <div className="flex flex-col">
          {title && <div className="toast-title">{title}</div>}
          <div className="toast-content">{message}</div>
        </div>
      </div>
      <button className="toast-close-btn" onClick={onClose}>
        <span className="icon">{handleShowClose()}</span>
      </button>
    </div>
  );
};

Toast.defaultProps = {
  type: "success",
  message: "Add a meaningful toast message here.",
};

export default Toast;
