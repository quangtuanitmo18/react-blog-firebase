import { yupResolver } from "@hookform/resolvers/yup";
import Field from "components/field/Field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useAuth } from "contexts/AuthContext";
import { auth } from "firebase-app/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import styled from "styled-components";
import AuthenticationPage from "./AuthenticationPage";
import { IconEyesClose, IconEyesOpen } from "components/icon";
import { Button } from "components/button";
import ToggleInputPassword from "components/input/ToggleInputPassword";

const SignInPageStyles = styled.div`
  .form {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
`;

const schemaValidation = yup.object({
  email: yup.string().email("email").required(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(
      /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+*!=]).*$/,
      {
        message:
          " password at least 1 uppercase, 1 lowwercase, 1 character, 1 number",
      }
    ),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  useEffect(() => {
    if (userInfo?.email) navigate("/");
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });

  const handleSubmitForm = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
      toast.success("successful login!", { delay: 10, pauseOnHover: false });
    } catch (error) {
      if (error.message.includes("wrong-password"))
        toast.error("It seems your password was wrong");
      else {
        toast.error("account password is incorrect", {
          delay: 10,
          pauseOnHover: false,
        });
      }
    }
  };

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length) {
      toast(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 10,
      });
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Login Page";
  }, []);

  return (
    <SignInPageStyles>
      <AuthenticationPage>
        <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
          <Field>
            <Label htmlFor="email">Email Address</Label>
            <Input
              name="email"
              type="email"
              placeholder="Please Enter Your Email Address"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <ToggleInputPassword control={control}></ToggleInputPassword>
          </Field>
          <div className="have-acccount">
            You have not had an account? <Link to="/sign-up">Register</Link>
          </div>
          <Button
            type="submit"
            className=" max-w-[340px]"
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
          >
            Login
          </Button>
        </form>
      </AuthenticationPage>
    </SignInPageStyles>
  );
};

export default SignInPage;
