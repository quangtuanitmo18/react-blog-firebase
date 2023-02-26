import Layout from "components/layout/Layout";
import { useAuth } from "contexts/AuthContext";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import HomeBanner from "modules/home/HomeBanner";
import HomeFeature from "modules/home/HomeFeature";
import HomeNewest from "modules/home/HomeNewest";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomeStyles = styled.div``;

const HomePage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  //   console.log(userInfo);
  const handleSignOut = () => {
    signOut(auth);
    navigate("/sign-in");
  };
  useEffect(() => {
    document.title = "Home Page";
  }, []);

  return (
    <HomeStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomeStyles>
  );
};

export default HomePage;
