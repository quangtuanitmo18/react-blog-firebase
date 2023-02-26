import React from "react";

const LoadingSkeleton = ({
  className = "",
  height,
  radius = "inherit",
  width = "100%",
}) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        height: height,
        width: width || "100%",
        borderRadius: radius,
      }}
    ></div>
  );
};

export default LoadingSkeleton;
