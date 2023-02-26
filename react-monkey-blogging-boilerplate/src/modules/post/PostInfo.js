import React from "react";
import styled from "styled-components";

const PostInfoStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  /* color: white; */
  margin-left: auto;
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;
const PostInfo = ({
  className = "",
  time = "Mar 23",
  author = "Adrey lee",
  children,
  ...props
}) => {
  return (
    <PostInfoStyles className={`post-info ${className}`} {...props}>
      <span className="post-time">{time}</span>
      <span className="post-dot"></span>
      <span className="post-author">{author}</span>
      {children}
    </PostInfoStyles>
  );
};

export default PostInfo;
