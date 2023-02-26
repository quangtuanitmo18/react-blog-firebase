import { getFormatDate } from "helper/Helper";
import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostInfo from "./PostInfo";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
      }
    }
    &-category {
      margin-bottom: 16px;
    }
    &-info {
      margin-left: 0;
    }

    &-title {
      margin-bottom: 12px;
    }
  }
`;

const PostItem = ({ data }) => {
  console.log(data);
  return (
    <PostItemStyles>
      <PostImage url={data?.image} alt={data?.image_name} />

      <PostCategory>{data?.category?.name}</PostCategory>
      <PostTitle to={data?.slug}>{data?.title}</PostTitle>
      <PostInfo
        time={getFormatDate(data?.createdAt?.seconds)}
        author={data?.user?.username}
      ></PostInfo>
    </PostItemStyles>
  );
};

export default PostItem;
