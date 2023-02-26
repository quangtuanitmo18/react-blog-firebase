import { AuthProvider, useAuth } from "contexts/AuthContext";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { Suspense } from "react";
import LoadingSpinner from "components/loading/LoadingSpinner";

const DashboardLayout = React.lazy(() =>
  import("modules/dashboard/DashboardLayout")
);
const DashboardPage = React.lazy(() => import("pages/DashboardPage"));
const PostAddNew = React.lazy(() => import("modules/post/PostAddNew"));
const HomePage = React.lazy(() => import("pages/HomePage"));
const NotFoundPage = React.lazy(() => import("pages/NotFoundPage"));
const PostDetailsPage = React.lazy(() => import("pages/PostDetailPage"));
const UserAddNew = React.lazy(() => import("modules/user/UserAddNew"));
const UserProfile = React.lazy(() => import("modules/user/UserProfile"));
const SignInPage = React.lazy(() => import("pages/SignInPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const PostManage = React.lazy(() => import("modules/post/PostManage"));
const CategoryAddNew = React.lazy(() =>
  import("modules/category/CategoryAddNew")
);
const CategoryManage = React.lazy(() =>
  import("modules/category/CategoryManage")
);
const UserManage = React.lazy(() => import("modules/user/UserManage"));
const CategoryUpdate = React.lazy(() =>
  import("modules/category/CategoryUpdate")
);
const UserUpdate = React.lazy(() => import("modules/user/UserUpdate"));
const PostUpdate = React.lazy(() => import("modules/post/PostUpdate"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/posts"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
            </Route>

            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
