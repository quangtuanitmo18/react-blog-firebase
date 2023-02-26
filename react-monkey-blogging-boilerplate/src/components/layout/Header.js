import { Button } from "components/button";
import { IconInputSearch } from "components/icon";
import { Input } from "components/input";
import { useAuth } from "contexts/AuthContext";
import { getLastName } from "helper/Helper";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
const HeaderStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header {
    &-left,
    &-right {
      display: flex;
      align-items: center;
      column-gap: 20px;
    }
  }
  .menu-main {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .menu-item {
    font-size: 18px;
    line-height: 27px;
    font-weight: 500;
  }
  .logo {
    max-width: 43px;
    cursor: pointer;
  }
  .search {
    width: 320px;
    position: relative;
    border: 1px solid #cfcfcf;
    border-radius: 8px;
    &-input {
      width: 100%;
      padding: 18px 40px 18px 20px;
      border-radius: inherit;
    }
    &-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 1.5rem;
    }
  }
  .sign-up {
    max-width: 190px;
    height: 60px;
    padding: 16px 60px;
    font-size: 18px;
  }
`;

const menuLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const Header = () => {
  const { userInfo } = useAuth();
  return (
    <HeaderStyles>
      <div className="header-left">
        <img srcSet="/logo.png 2x" alt="" className="logo" />
        <ul className="menu-main">
          {menuLinks.length > 0 &&
            menuLinks.map((item) => (
              <NavLink className="menu-item" key={uuidv4()} to={item.link}>
                {item.name}
              </NavLink>
            ))}
        </ul>
      </div>
      <div className="header-right">
        <div className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Search posts..."
          />
          <IconInputSearch className="search-icon"></IconInputSearch>
        </div>
        {userInfo ? (
          <span>
            Welcome
            <strong className="text-primary">
              {" "}
              {getLastName(userInfo.displayName)}
            </strong>
          </span>
        ) : (
          <Button to="sign-up" className="sign-in">
            Login
          </Button>
        )}
      </div>
    </HeaderStyles>
  );
};

export default Header;
