import { async } from "@firebase/util";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import DashboardHeading from "modules/dashboard/DashboardHeading";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { statusCategory } from "utils/constants";

const CategoryUpdate = () => {
  const [params] = useSearchParams("id");
  const categoryId = params.get("id");
  // chi lưu thông tin của nguồi tạo, còn ngươì sua thì ko

  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });
  const watchStatus = watch("status");
  const handleUpdateCategory = async (values) => {
    try {
      const colRef = doc(db, "categories", categoryId);
      await updateDoc(colRef, {
        name: values.name,
        slug: slugify(values.slug || values.name, { lower: true }),
        status: Number(values.status),
      });
      toast.success("Successful category update ...!");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      //   console.log(singleDoc.data());
      reset({ ...singleDoc.data() });
    }
    fetchData();
  }, [categoryId, reset]);

  if (!categoryId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc="Update category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
