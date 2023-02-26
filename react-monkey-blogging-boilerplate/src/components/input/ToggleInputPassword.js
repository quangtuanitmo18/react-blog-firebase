import { IconEyesClose, IconEyesOpen } from "components/icon";
import React, { Fragment, useState } from "react";
import Input from "./Input";
const ToggleInputPassword = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;

  return (
    <Fragment>
      <Input
        name="password"
        type={togglePassword ? "text" : "password"}
        placeholder="Please Enter Your Password"
        control={control}
      >
        {togglePassword ? (
          <IconEyesOpen onClick={() => setTogglePassword(false)}></IconEyesOpen>
        ) : (
          <IconEyesClose
            onClick={() => setTogglePassword(true)}
          ></IconEyesClose>
        )}
      </Input>
    </Fragment>
  );
};

export default ToggleInputPassword;
