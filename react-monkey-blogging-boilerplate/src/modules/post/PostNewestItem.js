import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostInfo from "./PostInfo";
import PostTitle from "./PostTitle";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      width: 180px;
      height: 130px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
      }
    }
    &-category {
      display: inline-block;
      padding: 8px;
      border-radius: 8px;
      color: #6b6b6b;
      font-size: 12px;
      font-weight: 600;
      background-color: white;
      margin-bottom: 8px;
    }

    &-title {
      margin-bottom: 12px;
    }
  }
`;
const PostNewestItem = () => {
  return (
    <PostNewestItemStyles>
      <PostImage
        url="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
        alt=""
      />
      <div className="post-content">
        <PostCategory type="secondary">Knowledge</PostCategory>

        <PostTitle>
          The complete guide to learn new languages for beginners
        </PostTitle>
        <PostInfo time="May 15" author="Linh"></PostInfo>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
