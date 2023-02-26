import React from "react";
import styled from "styled-components";

const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0px;
  }
  @media screen and (max-width: 1023.98px) {
    margin-bottom: 20px;
  }
`;

const Field = ({ children, ...props }) => {
  return <FieldStyles {...props}>{children}</FieldStyles>;
};

export default Field;
