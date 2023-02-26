import React from "react";
import { useController } from "react-hook-form";

import styled from "styled-components";

const InputStyles = styled.div`
  position: relative;
  width: 100%;
  input {
    padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
    width: 100%;
    border: 1px solid ${(props) => props.theme.grayLight_color};
    border-radius: 8px;
    transition: all 0.2s linear;
  }
  input:focus {
    border-color: ${(props) => props.theme.primary_color};
  }
  input::-webkit-input-placeholder {
    color: ${(props) => props.theme.grayLight_color};
  }
  input::-moz-input-placeholder {
    color: ${(props) => props.theme.grayLight_color};
  }
  .icon-input {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    cursor: pointer;
  }
`;

const Input = ({ name, type = "text", children, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputStyles hasIcon={children ? true : false}>
      <input type={type} id={name} {...field} {...props} />
      {children ? <div className="icon-input">{children}</div> : ""}
    </InputStyles>
  );
};

export default Input;
