import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    font-weight: 600;
    font-size: 40px;
    line-height: 60px;
    color: ${(props) => props.theme.primary_color};
    text-align: center;
    margin-bottom: 100px;
  }
  .have-acccount {
    margin-block: 15px;
    a {
      color: ${(props) => props.theme.primary_color};
    }
  }
`;
const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <div className="text-center">
          <NavLink to="/" className="inline-block">
            <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
          </NavLink>
        </div>
        <div className="heading">Monkey Blogging</div>
        {children}
      </div>
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;
