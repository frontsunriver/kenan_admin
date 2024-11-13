import React from "react";

const CloseIcon = ({ color = "#000" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
    <path
      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
      fill={color}
    />
  </svg>
);
const SuccessIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="16.5" stroke="#136C17" strokeWidth="1.83333" />
    <path
      d="M14.6654 22L20.1654 27.5L29.332 16.5"
      stroke="#136C17"
      strokeWidth="1.83333"
    />
  </svg>
);
const FailureIcon = () => (
  <svg viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.5 11.9453V20.0391"
      stroke="#EB0400"
      strokeWidth="2.3125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32.5004 13.2302V23.7751C32.5004 25.5018 31.5754 27.1052 30.08 27.9839L20.9225 33.2718C19.4271 34.1352 17.577 34.1352 16.0662 33.2718L6.90871 27.9839C5.41329 27.1206 4.48828 25.5172 4.48828 23.7751V13.2302C4.48828 11.5035 5.41329 9.90009 6.90871 9.02134L16.0662 3.73344C17.5616 2.8701 19.4117 2.8701 20.9225 3.73344L30.08 9.02134C31.5754 9.90009 32.5004 11.4881 32.5004 13.2302Z"
      stroke="#EB0400"
      strokeWidth="2.3125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 24.9766V25.1307"
      stroke="#EB0400"
      strokeWidth="2.3125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const WarningIcon = () => (
  <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 14.25V22.1667"
      stroke="#E2701C"
      strokeWidth="2.375"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.0004 33.9037H9.40542C3.91126 33.9037 1.61542 29.9771 4.27542 25.1796L9.21542 16.2813L13.8704 7.92125C16.6888 2.83875 21.3121 2.83875 24.1304 7.92125L28.7854 16.2971L33.7254 25.1954C36.3854 29.9929 34.0738 33.9196 28.5954 33.9196H19.0004V33.9037Z"
      stroke="#E2701C"
      strokeWidth="2.375"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.9922 26.9141H19.0064"
      stroke="#E2701C"
      strokeWidth="2.375"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const PrimaryIcon = () => (
  <svg viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.4987 33.9193C26.9779 33.9193 33.9154 26.9818 33.9154 18.5026C33.9154 10.0234 26.9779 3.08594 18.4987 3.08594C10.0195 3.08594 3.08203 10.0234 3.08203 18.5026C3.08203 26.9818 10.0195 33.9193 18.4987 33.9193Z"
      stroke="white"
      strokeWidth="2.3125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 12.3359V20.0443"
      stroke="white"
      strokeWidth="2.3125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.4922 24.6641H18.506"
      stroke="white"
      strokeWidth="2.3125"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { CloseIcon, SuccessIcon, FailureIcon, WarningIcon, PrimaryIcon };
