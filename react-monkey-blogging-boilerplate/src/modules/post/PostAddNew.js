import { Button } from "components/button";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { Dropdown } from "components/dropdown";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { Radio } from "components/checkbox";
import { status, statusPost } from "utils/constants";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ImageUpload from "components/image/ImageUpload";
import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import Toggle from "components/toggle/Toggle";
import useFirebaseImage from "hooks/useFirebaseImage";
import { useAuth } from "contexts/AuthContext";
import { toast } from "react-toastify";
import DashboardHeading from "modules/dashboard/DashboardHeading";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import { QuillContent } from "components/quill";
Quill.register("modules/imageUploader", ImageUploader);

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const [categoriesItem, setCategoriesItem] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const { userInfo } = useAuth();
  const [content, setContent] = useState("");
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: statusPost.pending,
      hot: false,
      image: "",
      category: {},
      user: {},
      createdAt: new Date(),
    },
  });
  const {
    image,
    progress,
    handleDeleteImage,
    handleSelectImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);

  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const handleAddPost = async (values) => {
    if (!isValid) return null;
    const cloneValues = { ...values };
    cloneValues.slug =
      slugify(cloneValues.slug, { lower: true }) ||
      slugify(cloneValues.title, { lower: true });
    cloneValues.status = Number(cloneValues.status);
    // add post
    const colRef = collection(db, "posts");
    try {
      console.log(cloneValues);
      await addDoc(colRef, {
        ...cloneValues,
        user: getValues("user"),
        content: content,
        category: getValues("category"),
        createdAt: serverTimestamp(),
      });
      toast.success("you successfully added the post!");
      reset({
        title: "",
        slug: "",
        status: statusPost.pending,
        hot: false,
        image: "",
        categoryId: "",
      });
      setContent("");
      handleResetUpload();
      setSelectCategory("");
    } catch (error) {
      toast.error("Something went wrong ...!");
    }
  };
  const handleSelectOption = (item) => {
    setSelectCategory(item.name);

    setValue("category", {
      id: item.id,
      slug: item.slug,
      name: item.name,
    });
  };
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setCategoriesItem(results);
    }
    getData();
  }, []);
  useEffect(() => {
    async function fetchUserData() {
      const colRef = doc(db, "users", userInfo.uid);
      const docData = await getDoc(colRef);
      const userData = docData.data();
      setValue("user", {
        id: userInfo.uid,
        fullname: userData.fullname,
        username: userData.username,
        email: userData.email,
        avatar: userData.avatar,
        avatar_name: userData.avatar_name,
      });
    }
    fetchUserData();
  }, [setValue, userInfo.uid]);

  return (
    <PostAddNewStyles>
      <DashboardHeading title="Add post" desc="Add new post"></DashboardHeading>

      <form onSubmit={handleSubmit(handleAddPost)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={selectCategory || "select your skill"}
              ></Dropdown.Select>
              <Dropdown.List>
                {categoriesItem.length > 0 &&
                  categoriesItem.map((item) => (
                    <Dropdown.Option
                      key={uuidv4()}
                      onClick={() => handleSelectOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </Field>
        </div>
        {/*  */}
        <QuillContent content={content} setContent={setContent}></QuillContent>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <FieldCheckboxes>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) == statusPost.approved}
                value={statusPost.approved}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) == statusPost.pending}
                value={statusPost.pending}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) == statusPost.reject}
                value={statusPost.reject}
              >
                Reject
              </Radio>
            </div>
          </FieldCheckboxes>
          <Field>
            <Label>Hot</Label>
            <Toggle
              name="hot"
              on={watchHot === true}
              onClick={() => {
                setValue("hot", !watchHot);
              }}
            ></Toggle>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              image={image}
              progress={progress}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto max-w-[250px]"
          isSubmitting={isSubmitting}
          disabled={isSubmitting}
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
