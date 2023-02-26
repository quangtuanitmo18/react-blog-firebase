import LoadingSpinner from "components/loading/LoadingSpinner";
import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

import styled, { css } from "styled-components";
import { Link, NavLink } from "react-router-dom";
// import { lineClamp } from "styles/mixins";
const ButtonStyles = styled.button`
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height || "70px"};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary_color},
        ${(props) => props.theme.secondary_color}
      );
    `};
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary_color};
      background-color: white;
    `};
  ${(props) =>
    props.kind === "ghost" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: rgba(29, 192, 113, 0.1);
    `};

  //hoc duoc cac viet mixin trong styled component
`;
// de tuy chinh duoc button co the dua prop vao hoac la de  style inline trong khi dung styled component

/**
 * @param {bool} isSubmiting Type of True | False
 * @param {bool} disabled Type of True | False
 * @param {node} children Type node children
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 * @returns
 */

const Button = ({
  type = "button",
  children,
  disabled = false,
  isSubmitting = false,
  kind = "primary",
  to = "",
  // className = "", ...props npo da co roi
  ...props
}) => {
  const child = isSubmitting ? <LoadingSpinner></LoadingSpinner> : children;
  // throw Error("wrong!");

  if (to !== "" && typeof to === "string") {
    return (
      <Link to={`/${to}`} className="inline-block">
        <ButtonStyles type={type} kind={kind} {...props}>
          {children}
        </ButtonStyles>
      </Link>
    );
  } else {
    return (
      <ButtonStyles type={type} disabled={disabled} kind={kind} {...props}>
        {child}
      </ButtonStyles>
    );
  }
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  kind: PropTypes.oneOf(["primary", "secondary", "ghost"]),
};

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-container">
      <div role="alert">
        <p>Something went wrong with the button component</p>
        <pre className="error-message">{error.message}</pre>
        {/* <button onClick={resetErrorBoundary}>Try again</button> */}
      </div>
    </div>
  );
}

export default withErrorBoundary(Button, { FallbackComponent: ErrorFallback });
