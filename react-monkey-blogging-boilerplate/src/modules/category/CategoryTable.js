import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import useLoadmoreAndFilter from "hooks/useLoadmoreAndFilter";
import useSweetDelete from "hooks/useSweetDelete";
import React from "react";
import { Navigate } from "react-router-dom";
import { statusCategory } from "utils/constants";

const CategoryTable = () => {
  const {
    dataTable: categories,
    total,
    handleFilter,
    handleLoadmore,
  } = useLoadmoreAndFilter("categories");
  const { handleDelete } = useSweetDelete();
  return (
    <>
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
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>
                  {item.status === statusCategory.approved && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {item.status === statusCategory.unapproved && (
                    <LabelStatus type="success">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex gap-4 flex-col-3">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() => {
                        Navigate(`/manage/update-category?id=${item.id}`);
                      }}
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => {
                        handleDelete(item.id, "categories");
                      }}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > categories.length && (
        <button
          type="button"
          className="p-3 mt-10 text-white rounded-md bg-primary"
          onClick={handleLoadmore}
        >
          Load More
        </button>
      )}
    </>
  );
};

export default CategoryTable;
