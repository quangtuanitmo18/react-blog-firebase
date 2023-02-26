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
import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { collection, doc, setDoc } from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";
const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      status: statusUser.pending,
      role: roleUser.user,
    },
  });

  const {
    image,
    setImage,
    progress,
    setProgress,
    handleDeleteImage,
    handleSelectImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);

  const watchStatus = watch("status");
  const watchRole = watch("role");
  const handleAddUser = async (values) => {
    if (!isValid) return null;

    const cloneValues = { ...values };
    // console.log(cloneValues);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        cloneValues.email,
        cloneValues.password
      );
      await updateProfile(auth.currentUser, {
        displayName: cloneValues.fullname,
      });
      const colRef = collection(db, "users");
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname: cloneValues.fullname,
        username: slugify(values.fullname, { lower: true, replacement: "" }),
        email: cloneValues.email,
        password: cloneValues.password,
        avatar: cloneValues.image,
        avatar_name: cloneValues.image_name,
        status: Number(cloneValues.status),
        role: Number(cloneValues.role),
        createdAt: new Date(),
      });
      toast.success("you have successfully added the user!");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
    }
  };

  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddUser)}>
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
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
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
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
