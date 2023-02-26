import React from "react";

import styled from "styled-components";

const LabelStyles = styled.label`
  font-size: 18px;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  color: ${(props) => props.theme.grayDark_color};
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};

export default Label;
