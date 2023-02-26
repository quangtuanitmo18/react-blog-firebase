import { Button } from "components/button";
import { Dropdown } from "components/dropdown";
import { useAuth } from "contexts/AuthContext";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
    img {
      max-width: 40px;
    }
  }
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);
  return (
    <DashboardHeaderStyles>
      <Link to="/" className="logo">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
        <span className="hidden lg:inline-block">Monkey Blogging</span>
      </Link>
      <div className="header-right">
        <Button to="manage/add-post" className="header-button" height="52px">
          Write new post
        </Button>

        <Dropdown className="w-auto">
          <Dropdown.Select isIcon={false} className="px-0 py-0 border-none">
            <div to="/profile" className="header-avatar">
              <img src={userInfo.avatar} alt="" />
            </div>
          </Dropdown.Select>
          <Dropdown.List className="!w-40 -translate-x-full translate-y-2 rounded-lg shadow-2xl ">
            <div className="flex flex-col gap-4">
              <Link className="p-4 capitalize hover:text-primary" to="/profile">
                Profile
              </Link>
            </div>
          </Dropdown.List>
        </Dropdown>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
