import React from "react";

import styled from "styled-components";

const LoaddingSpinnerStyled = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  border: ${(props) => props.borderWidth} solid
    ${(props) => props.theme.primary_color};
  border-top-color: transparent;
  border-radius: 50%;
  margin: 0 auto;
  animation: spinner 1s infinite linear;
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = ({ width = "40px", borderWidth = "5px" }) => {
  return (
    <LoaddingSpinnerStyled
      width={width}
      borderWidth={borderWidth}
      //   borderColor={borderColor}
    ></LoaddingSpinnerStyled>
  );
};

export default LoadingSpinner;
