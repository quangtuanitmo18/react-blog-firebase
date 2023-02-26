import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { getFormatDate } from "helper/Helper";
import PostCategory from "modules/post/PostCategory";
import PostImage from "modules/post/PostImage";
import PostInfo from "modules/post/PostInfo";
import PostItem from "modules/post/PostItem";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { gridLayout } from "styles/mixins";
import NotFoundPage from "./NotFoundPage";
import parse from "html-react-parser";
import PostRelated from "modules/post/PostRelated";

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
      margin-block: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
      line-height: 1.2;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 20px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  .grid-layout {
    ${gridLayout({ widthItem: 220, numberItem: 4 })};
  }
`;

const PostDetailsPage = () => {
  const [postDetail, setPostDetail] = useState({});
  const [categoryId, setCategoryId] = useState("");
  const [currentId, setCurentId] = useState("");
  const { slug } = useParams();
  useEffect(() => {
    async function fethDataPost() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((item) => {
          const dataPost = item.data();
          const idPost = item.id;
          setPostDetail({ id: idPost, ...dataPost });
          setCategoryId(item.data().category.id);
          setCurentId(item.id);
        });
      });
    }
    fethDataPost();
  }, [slug]);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);

  if (!slug) return <NotFoundPage></NotFoundPage>;
  if (!postDetail.title) return null;

  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={postDetail.image}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6">
                {postDetail.category.name}
              </PostCategory>
              <h1 className="post-heading">{postDetail.title}</h1>
              <PostInfo
                time={getFormatDate(postDetail.createdAt.seconds)}
                author={postDetail.user.username}
              ></PostInfo>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              {parse(postDetail.content || "")}
            </div>
            <div className="author">
              <div className="author-image">
                <img
                  src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                  alt=""
                />
              </div>
              <div className="author-content">
                <h3 className="author-name">Evondev</h3>
                <p className="author-desc">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos non animi porro voluptates quibusdam optio nulla
                  quis nihil ipsa error delectus temporibus nesciunt, nam
                  officiis adipisci suscipit voluptate eum totam!
                </p>
              </div>
            </div>
          </div>
          <PostRelated categoryId={categoryId}></PostRelated>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
