import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import LoadingSpinner from "components/loading/LoadingSpinner";

import { Table } from "components/table";
import { useAuth } from "contexts/AuthContext";
import { db } from "firebase-app/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import useLoadmoreAndFilter from "hooks/useLoadmoreAndFilter";
import useSweetDelete from "hooks/useSweetDelete";
import DashboardHeading from "modules/dashboard/DashboardHeading";
import NotFoundPage from "pages/NotFoundPage";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { statusPost } from "utils/constants";

const PostManage = () => {
  const navigate = useNavigate();
  const {
    dataTable: posts,
    total,
    handleFilter,
    handleLoadmore,
  } = useLoadmoreAndFilter("posts");
  const { userInfo } = useAuth();

  const { handleDelete } = useSweetDelete();
  if (userInfo.role && userInfo.role !== 1)
    return <NotFoundPage></NotFoundPage>;
  return (
    <div>
      <DashboardHeading
        title="Posts"
        desc="Manage your posts"
      ></DashboardHeading>

      <input
        className="p-3 mb-3 ml-auto border border-solid rounded-md border-primary"
        type="text"
        placeholder="Search..."
        onChange={handleFilter}
      />

      <div className="w-full overflow-auto">
        <Table>
          <table className="table-users">
            <thead>
              <tr>
                <th>ID</th>
                <th>Post</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 &&
                posts.map((item) => (
                  <tr key={item.id}>
                    <td title={item.id}>{item.id.slice(0, 5) + "..."}</td>
                    <td>
                      <div className="flex items-center gap-3 truncate max-w-[200px] lg:max-w-full">
                        <img
                          className="object-cover w-16 h-16 shrink-0"
                          src={item.image}
                          alt={item.image_name}
                        />
                        <span className="inline-block truncate">
                          {" "}
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td>{item.category.name}</td>
                    <td>{item.user.username}</td>
                    <td>
                      {item.status === statusPost.approved && (
                        <LabelStatus type="success">Approved</LabelStatus>
                      )}
                      {item.status === statusPost.pending && (
                        <LabelStatus type="success">Pending</LabelStatus>
                      )}
                      {item.status === statusPost.reject && (
                        <LabelStatus type="success">Reject</LabelStatus>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-4 flex-col-3">
                        <ActionView
                          onClick={() => {
                            navigate(`/${item.slug}`);
                          }}
                        ></ActionView>
                        <ActionEdit
                          onClick={() => {
                            navigate(`/manage/update-post?id=${item.id}`);
                          }}
                        ></ActionEdit>
                        <ActionDelete
                          onClick={() => {
                            handleDelete(item.id, "posts");
                          }}
                        ></ActionDelete>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Table>
      </div>
      {total > posts.length && (
        <button
          type="button"
          className="p-3 mt-10 text-white rounded-md bg-primary"
          onClick={handleLoadmore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default PostManage;
