import React from "react";
import styled, { css } from "styled-components";

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  ${(props) =>
    props.type === "secondary" &&
    css`
      color: ${(props) => props.theme.grayF3_color};
      background-color: ${(props) => props.theme.gray6B_color};
    `};
  ${(props) =>
    props.type === "primary" &&
    css`
      color: ${(props) => props.theme.gray6B_color};
      background-color: ${(props) => props.theme.grayF3_color};
    `};
`;

const PostCategory = ({
  children,
  type = "primary",
  className = "",
  ...props
}) => {
  return (
    <PostCategoryStyles
      className={`post-category ${className}`}
      type={type}
      {...props}
    >
      {children}
    </PostCategoryStyles>
  );
};

export default PostCategory;
