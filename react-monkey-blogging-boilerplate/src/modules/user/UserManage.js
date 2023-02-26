import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { useAuth } from "contexts/AuthContext";

import { getFormatDate } from "helper/Helper";
import useLoadmoreAndFilter from "hooks/useLoadmoreAndFilter";
import useSweetDelete from "hooks/useSweetDelete";
import DashboardHeading from "modules/dashboard/DashboardHeading";
import NotFoundPage from "pages/NotFoundPage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { statusUser } from "utils/constants";

const UserManage = () => {
  const navigate = useNavigate();
  const {
    dataTable: userList,
    total,
    handleFilter,
    handleLoadmore,
  } = useLoadmoreAndFilter("users");
  const { userInfo } = useAuth();

  const { handleDelete } = useSweetDelete();
  if (userInfo.role !== 1) return <NotFoundPage></NotFoundPage>;
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>

      <input
        className="p-3 mb-3 ml-auto border border-solid rounded-md border-primary"
        type="text"
        placeholder="Search..."
        onChange={handleFilter}
      />

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email Address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((item) => (
              <tr key={item.id}>
                <td title={item.id}>{item.id.slice(0, 5) + "..."}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <img
                      className="w-12 h-12"
                      src={item.avatar}
                      alt={item.avatar_name}
                    />
                    <div className="flex flex-col gap-2">
                      <p>{item.fullname}</p>
                      <span>{getFormatDate(item?.createdAt.seconds)}</span>
                    </div>
                  </div>
                </td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>
                  {item.status === statusUser.active && (
                    <LabelStatus type="success">Active</LabelStatus>
                  )}
                  {item.status === statusUser.pending && (
                    <LabelStatus type="warning">Pending</LabelStatus>
                  )}
                  {item.status === statusUser.ban && (
                    <LabelStatus type="danger">Banned</LabelStatus>
                  )}
                </td>
                <td>{item.role}</td>
                <td>
                  <div className="flex gap-4 flex-col-3">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() => {
                        navigate(`/manage/update-user?id=${item.id}`);
                      }}
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => {
                        handleDelete(item.id, "users");
                      }}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > userList.length && (
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

export default UserManage;
