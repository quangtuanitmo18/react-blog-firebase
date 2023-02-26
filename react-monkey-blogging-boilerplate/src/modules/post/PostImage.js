import React from "react";
import styled from "styled-components";
const PostImageStyles = styled.div`
  border-radius: 16px;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;
const PostImage = ({ url = "/", alt = "", className = "" }) => {
  return (
    <PostImageStyles className={`post-image ${className}`}>
      <img src={url} alt={alt} />
    </PostImageStyles>
  );
};

export default PostImage;
