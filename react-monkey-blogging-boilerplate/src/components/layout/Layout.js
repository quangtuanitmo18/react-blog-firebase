import React from "react";

import styled from "styled-components";
import Header from "./Header";

const LayoutStyles = styled.div`
  margin-block: 40px;
`;

const Layout = ({ children }) => {
  return (
    <LayoutStyles className="container">
      <Header></Header>
      {children}
    </LayoutStyles>
  );
};

export default Layout;
