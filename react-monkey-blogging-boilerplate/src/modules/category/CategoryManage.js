import LoadingSpinner from "components/loading/LoadingSpinner";
import { useAuth } from "contexts/AuthContext";
import useLoadmoreAndFilter from "hooks/useLoadmoreAndFilter";
import useSweetDelete from "hooks/useSweetDelete";
import DashboardHeading from "modules/dashboard/DashboardHeading";
import NotFoundPage from "pages/NotFoundPage";
import React, { Suspense } from "react";

const CategoryTable = React.lazy(() => import("./CategoryTable"));

const CategoryManage = () => {
  const { userInfo } = useAuth();
  // if (userInfo.role !== 1) return <NotFoundPage></NotFoundPage>;
  return (
    <>
      <DashboardHeading
        title="Categories"
        desc="Manage your category"
      ></DashboardHeading>
      <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
        <CategoryTable></CategoryTable>
      </Suspense>
    </>
  );
};

export default CategoryManage;
