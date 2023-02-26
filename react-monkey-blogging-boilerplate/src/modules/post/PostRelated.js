import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { gridLayout } from "styles/mixins";
import PostItem from "./PostItem";

const HomeFeatureStyles = styled.div`
  .grid-layout {
    ${gridLayout({})};
  }
`;
const PostRelated = ({ categoryId }) => {
  const [postRelated, setPostRelated] = useState([]);

  //   console.log(categoryId, currentId);
  // phia lay cai khac id hiện tại

  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("category.id", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      const result = [];
      snapshot.forEach((item) => {
        result.push({ id: item.id, ...item.data() });
      });
      setPostRelated(result);
    });
  }, [categoryId]);

  if (!categoryId) return null;

  return (
    <HomeFeatureStyles className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout">
        {postRelated.length > 0 &&
          postRelated.map((item) => <PostItem data={item}></PostItem>)}
        {/* <PostItem></PostItem>
    <PostItem></PostItem>
    <PostItem></PostItem>
    <PostItem></PostItem> */}
      </div>
    </HomeFeatureStyles>
  );
};

export default PostRelated;
