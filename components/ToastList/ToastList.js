import React, { useEffect, useRef } from "react";
import Toast from "../Toast/Toast";
import { useToast } from "provider/ToastContext";

const ToastList = () => {
  const { toasts, position, removeToast } = useToast();
  const listRef = useRef(null);

  const handleScrolling = (el) => {
    const isTopPosition = ["top-left", "top-right"].includes(position);
    if (isTopPosition) {
      el?.scrollTo(0, el.scrollHeight);
    } else {
      el?.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    handleScrolling(listRef.current);
  }, [position, toasts]);

  const sortedData = position.includes("bottom")
    ? [...toasts].reverse()
    : [...toasts];

  return (
    sortedData.length > 0 && (
      <div
        className={`toast-list toast-list--${position}`}
        aria-live="assertive"
        ref={listRef}
      >
        {sortedData.map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    )
  );
};

ToastList.defaultProps = {
  position: "top-right",
};

export default ToastList;
