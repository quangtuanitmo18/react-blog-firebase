import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field, FieldCheckboxes } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import Toggle from "components/toggle/Toggle";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "modules/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

import { statusPost } from "utils/constants";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { QuillContent } from "components/quill";

const PostUpdate = () => {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [categoriesItem, setCategoriesItem] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [content, setContent] = useState("");
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
  const watchHot = watch("hot");
  const { image, setImage, progress, handleDeleteImage, handleSelectImage } =
    useFirebaseImage(setValue, getValues, imageName, callBackUpdateImage);

  async function callBackUpdateImage() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      image: "",
      image_name: "",
    });
  }
  const handleSelectOption = (item) => {
    setSelectCategory(item.name);

    setValue("category", {
      id: item.id,
      slug: item.slug,
      name: item.name,
    });
  };
  const handleUpdatePost = async (values) => {
    try {
      const colRef = doc(db, "posts", postId);
      //   console.log(values);
      await updateDoc(colRef, {
        title: values.title,
        slug: slugify(values.slug, { lower: true }),
        status: Number(values.status),
        image: values.image,
        image_name: values.image_name,
        hot: values.hot,
        content: values.content,
        category: values.category,
      });
      toast.success("Successful user update ...!");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "posts", postId);
      const singleDoc = await getDoc(colRef);
      //   console.log(singleDoc.data());
      setImage(singleDoc.data().image);
      //   setValue("image_name", singleDoc.data().avatar_name);
      setImageName(singleDoc.data().image_name);
      //   console.log(singleDoc.data());
      reset({ ...singleDoc.data() });
      setSelectCategory(singleDoc.data().category.name);
      setContent(singleDoc.data().content);
    }
    fetchData();
  }, [postId, reset, setImage]);

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

  if (!postId) return null;

  // useEffect(() => {
  //   async function fetchUserData() {
  //     const colRef = doc(db, "users", userInfo.uid);
  //     const docData = await getDoc(colRef);
  //     const userData = docData.data();
  //     setValue("user", {
  //       id: userInfo.uid,
  //       fullname: userData.fullname,
  //       username: userData.username,
  //       email: userData.email,
  //       avatar: userData.avatar,
  //       avatar_name: userData.avatar_name,
  //     });
  //   }
  //   fetchUserData();
  // }, []);

  return (
    <div>
      <DashboardHeading
        title="Update post"
        desc="Update post"
      ></DashboardHeading>

      <form onSubmit={handleSubmit(handleUpdatePost)}>
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
          Update post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
