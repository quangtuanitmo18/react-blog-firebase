import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "modules/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { roleUser, statusUser } from "utils/constants";
import useFirebaseImage from "hooks/useFirebaseImage";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { useState } from "react";
import { async } from "@firebase/util";
import slugify from "slugify";
import { toast } from "react-toastify";

const UserUpdate = () => {
  const [params] = useSearchParams();
  const userId = params.get("id");
  //   console.log(userId);
  const [imageName, setImageName] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const { image, setImage, progress, handleDeleteImage, handleSelectImage } =
    useFirebaseImage(setValue, getValues, imageName, callBackUpdateImage);

  async function callBackUpdateImage() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
      avatar_name: "",
    });
  }

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "users", userId);
      const singleDoc = await getDoc(colRef);
      //   console.log(singleDoc.data());
      setImage(singleDoc.data().avatar);
      //   setValue("image_name", singleDoc.data().avatar_name);
      setImageName(singleDoc.data().avatar_name);
      reset({ ...singleDoc.data() });
    }
    fetchData();
  }, [userId, reset]);

  if (!userId) return null;

  const handleUpdateUser = async (values) => {
    // delete values.image;
    // delete values.image_name;
    // console.log(values);
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        fullname: values.fullname,
        username: slugify(values.fullname, { lower: true, replacement: "" }),
        // email: values.email,
        // passowrd
        // nho la may cai truong email, password laf ko doi <duco></duco>
        status: Number(values.status),
        role: Number(values.role),
        avatar: values.image,
        avatar_name: values.image_name,
      });
      toast.success("Successful user update ...!");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
    }
  };
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc="Update user"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            control={control}
            className="!rounded-full"
            image={image}
            progress={progress}
            handleDeleteImage={handleDeleteImage}
            onChange={handleSelectImage}
          ></ImageUpload>
        </div>

        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
              disabled
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
              disabled
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === statusUser.active}
                value={statusUser.active}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === statusUser.pending}
                value={statusUser.pending}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === statusUser.ban}
                value={statusUser.ban}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === roleUser.admin}
                value={roleUser.admin}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === roleUser.mod}
                value={roleUser.mod}
              >
                Moderator
              </Radio>

              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === roleUser.user}
                value={roleUser.user}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto max-w-[200px]"
          type="submit"
          disabled={isSubmitting}
          isSubmitting={isSubmitting}
        >
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
