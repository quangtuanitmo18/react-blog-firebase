import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useAuth } from "contexts/AuthContext";
import { db } from "firebase-app/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import DashboardHeading from "modules/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { statusCategory } from "utils/constants";

const CategoryAddNew = () => {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: statusCategory.unapproved,
      createdAt: new Date(),
    },
  });
  const watchStatus = watch("status");
  const { userInfo } = useAuth();
  const handleAddCategory = async (values) => {
    if (!isValid) return null;
    const cloneValues = { ...values };
    cloneValues.status = Number(cloneValues.status);
    cloneValues.slug = slugify(cloneValues.slug || cloneValues.name, {
      lower: true,
    });
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...cloneValues,
        userId: userInfo.uid,
        createdAt: serverTimestamp(),
      });
      toast.success("you successfully added the category!");
      reset({
        name: "",
        slug: "",
        status: 2,
      });
    } catch (error) {
      toast.error("Something went wrong ...!");
    }
  };

  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <FieldCheckboxes>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === statusCategory.approved}
                value={statusCategory.approved}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === statusCategory.unapproved}
                value={statusCategory.unapproved}
              >
                Unapproved
              </Radio>
            </div>
          </FieldCheckboxes>
        </div>
        <Button
          kind="primary"
          className="mx-auto max-w-[250px]"
          type="submit"
          disabled={isSubmitting}
          isSubmitting={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
