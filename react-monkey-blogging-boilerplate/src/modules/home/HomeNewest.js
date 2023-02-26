import Heading from "components/layout/Heading";
import PostItem from "modules/post/PostItem";
import PostNewestItem from "modules/post/PostNewestItem";
import PostNewestLarge from "modules/post/PostNewestLarge";
import React from "react";
import styled from "styled-components";
import { gridLayout } from "styles/mixins";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
  .grid-layout {
    ${gridLayout({ widthItem: 220, numberItem: 4 })};
  }
`;

const HomeNewest = () => {
  return (
    <HomeNewestStyles className="home-block">
      <Heading>Latest posts</Heading>
      <div className="layout">
        <PostNewestLarge></PostNewestLarge>
        <div className="sidebar">
          <PostNewestItem></PostNewestItem>
          <PostNewestItem></PostNewestItem>
          <PostNewestItem></PostNewestItem>
        </div>
      </div>
      <div className="grid-layout">
        {/* <PostItem></PostItem>
        <PostItem></PostItem>
        <PostItem></PostItem>
        <PostItem></PostItem> */}
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
