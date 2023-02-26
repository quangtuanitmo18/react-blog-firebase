import { Button } from "components/button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyles = styled.div`
  padding: 4rem;
  margin-top: 4.5rem;
  margin-bottom: 6rem;
  border-radius: 4px;
  background-image: linear-gradient(
    to left bottom,
    ${(props) => props.theme.primary_color},
    ${(props) => props.theme.secondary_color}
  );
  display: flex;
  .banner {
    &-left {
      width: 50%;
    }
    &-right {
      width: 50%;
    }
    &-title {
      font-size: 48px;
      line-height: 60px;
      font-weight: 700;
      margin-top: 40px;
      color: white;
    }
    &-desc {
      margin-top: 28px;
      font-size: 14px;
      line-height: 28px;
      color: white;
    }
  }
  .get-started {
    margin-top: 48px;
    max-width: 230px;
    height: 40px;
    padding: 16px 43px;
    font-size: 18px;
    line-height: 27px;
    margin-left: 0;
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="banner-left">
        <h1 className="banner-title font-secondary">Monkey Blogging</h1>
        <p className="banner-desc font-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus labore
          veritatis magnam molestiae minima, voluptate voluptatibus atque iste
          vero hic sint facere distinctio! Quo ullam facilis id molestiae illum
          amet itaque assumenda culpa asperiores dolore consectetur eligendi,
          quam ex eum cum distinctio, in, blanditiis necessitatibus ipsum. Qui,
          velit? Fuga
        </p>
        <Button kind="secondary" className="get-started">
          Get Started
        </Button>
      </div>
      <div className="banner-right">
        <img src="/Illustration2.png" alt="" className="banner-img" />
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
