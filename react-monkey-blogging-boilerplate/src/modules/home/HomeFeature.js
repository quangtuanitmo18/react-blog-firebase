import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import { v4 as uuidv4 } from "uuid";

import {
  collection,
  limit,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  PostFeatureItem,
  PostFeatureItemSkeleton,
} from "modules/post/PostFeatureItem";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { gridLayout } from "styles/mixins";
const HomeFeatureStyles = styled.div`
  .grid-layout {
    ${gridLayout({})};
  }
`;

const HomeFeature = () => {
  const [featurePost, setFeaturePost] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );
    onSnapshot(q, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setFeaturePost(results);
    });
  }, []);
  if (featurePost.length <= 0)
    return (
      <HomeFeatureStyles className="home-block">
        <Heading>Featured posts</Heading>
        <div className="grid-layout">
          {<PostFeatureItemSkeleton key={uuidv4()}></PostFeatureItemSkeleton>}
          {<PostFeatureItemSkeleton key={uuidv4()}></PostFeatureItemSkeleton>}
          {<PostFeatureItemSkeleton key={uuidv4()}></PostFeatureItemSkeleton>}
        </div>
      </HomeFeatureStyles>
    );
  return (
    <HomeFeatureStyles className="home-block">
      <Heading>Featured posts</Heading>
      <div className="grid-layout">
        {featurePost.length > 0 &&
          featurePost.map((item) => (
            <PostFeatureItem key={uuidv4()} data={item}></PostFeatureItem>
          ))}
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
