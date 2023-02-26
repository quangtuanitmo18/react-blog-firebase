import { Button } from "components/button";
import Field from "components/field/Field";
import { IconEyesClose, IconEyesOpen } from "components/icon";
import { Input } from "components/input";
import { Label } from "components/label";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";
import { useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useAuth } from "contexts/AuthContext";
import AuthenticationPage from "./AuthenticationPage";
import ToggleInputPassword from "components/input/ToggleInputPassword";
import slugify from "slugify";
import { defaultAvatar, roleUser, statusUser } from "utils/constants";

const SignUpPageStyled = styled.div`
  .form {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
`;

const schemaValidation = yup.object({
  fullname: yup.string().required().max(20).min(5),
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

const SignUpPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  // console.log(userInfo);

  useEffect(() => {
    console.log(userInfo);
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
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, { displayName: values.fullname });
    const colRef = collection(db, "users");
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      username: slugify(values.fullname, { lower: true, replacement: "" }),
      email: values.email,
      password: values.password,
      avatar: defaultAvatar,
      avatar_name: "",
      status: statusUser.active,
      role: roleUser.user,
      createdAt: new Date(),
    });

    navigate("/");
    toast.success("You have successfully registered!");
    // if (isValid) {
    //   // neu validate thanh cong moi day du lieu len api
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve();
    //       // reset({
    //       //   firstName: "",
    //       //   password: "",
    //       //   email: "",
    //       //   gender: "male",
    //       //   jobs: "",
    //       //   term: false,
    //       // });
    //       // setValue("lastName", "ds2", {
    //       //   shouldValidate: true,
    //       //   shouldDirty: true,
    //       // });
    //       console.log(values);
    //     }, 3000);
    //   });
    // }
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
    document.title = "Register Page";
  }, []);

  return (
    <SignUpPageStyled>
      <AuthenticationPage>
        <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
          <Field>
            <Label htmlFor="fullname">FullName</Label>
            <Input
              name="fullname"
              placeholder="Please Enter Your Fullname"
              control={control}
            ></Input>
          </Field>
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
            You already have an account? <Link to="/sign-in">Login</Link>
          </div>
          <Button
            type="submit"
            style={{ maxWidth: "340px" }}
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </AuthenticationPage>
    </SignUpPageStyled>
  );
};

export default SignUpPage;
