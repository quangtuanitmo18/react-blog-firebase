import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function createPortalWrapper() {
  const element = document.createElement("div");
  element.id = "portal-wrapper";
  return element;
}
const portalWrapperElm = createPortalWrapper();

const Portal = ({
  containerClassName = "",
  bodyClassName = "",
  containerStyle = {},
  bodyStyle = {},
  onClose = () => {},
  overlay = true,
  children,
}) => {
  useEffect(() => {
    document.body.appendChild(portalWrapperElm);
  }, []);
  const renderContent = (
    <div className={`${containerClassName}`} style={containerStyle}>
      {overlay && (
        <div
          className="fixed inset-0 bg-gray-500 overlay bg-opacity-20"
          onClick={onClose}
        ></div>
      )}
      <div className={`${bodyClassName}`} style={bodyStyle}>
        {children}
      </div>
    </div>
  );
  return ReactDOM.createPortal(renderContent, portalWrapperElm);
};

Portal.prototype = {
  containerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  containerStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
  onClose: PropTypes.func,
  overlay: PropTypes.bool,
  children: PropTypes.node,
};
export default Portal;
