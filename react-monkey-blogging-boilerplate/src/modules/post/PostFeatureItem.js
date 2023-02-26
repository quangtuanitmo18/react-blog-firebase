import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostInfo from "./PostInfo";
import PostTitle from "./PostTitle";
import { getFormatDate } from "helper/Helper";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    &-category {
      white-space: nowrap;
      overflow: hidden;
      max-width: 100px;
    }
    &-info {
    }

    &-title {
      margin-bottom: 12px;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;
const PostFeatureItem = ({ data }) => {
  // console.log(data);
  if (!data || !data.id) return null;

  return (
    <PostFeatureItemStyles>
      <PostImage url={data.image} alt={data.image_name} />
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory to={data?.category?.slug} className="post-category">
            {data?.category?.name}
          </PostCategory>
          <PostInfo
            time={getFormatDate(data?.createdAt?.seconds)}
            author={data?.user?.username}
          ></PostInfo>
        </div>
        <PostTitle to={data.slug}>{data.title}</PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

const PostFeatureItemSkeleton = () => {
  return (
    <PostFeatureItemStyles>
      <LoadingSkeleton width="100%" height="100%"></LoadingSkeleton>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <LoadingSkeleton
            width="50px"
            height="20px"
            radius="6px"
          ></LoadingSkeleton>
          <LoadingSkeleton
            width="100px"
            height="15px"
            radius="6px"
          ></LoadingSkeleton>
        </div>
        <LoadingSkeleton
          width="100%"
          height="50px"
          radius="8px"
        ></LoadingSkeleton>
      </div>
    </PostFeatureItemStyles>
  );
};

export { PostFeatureItem, PostFeatureItemSkeleton };
