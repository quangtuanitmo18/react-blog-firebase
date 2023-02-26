import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
const PostTitleStyles = styled.h3`
  font-weight: bold;
  line-height: 1.5;
  display: block;
  ${(props) =>
    props.type === "normal" &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.type === "big" &&
    css`
      font-size: 22px;
    `};

  /* color: white; color thi inherit no se giong mau cha no nen ko can chinh */
`;

const PostTitle = ({
  type = "normal",
  children,
  clasName = "",
  to = "",
  ...props
}) => {
  return (
    <Link to={`/${to}`}>
      <PostTitleStyles
        type={type}
        className={`post-title ${clasName}`}
        {...props}
      >
        {children}
      </PostTitleStyles>
    </Link>
  );
};

export default PostTitle;
