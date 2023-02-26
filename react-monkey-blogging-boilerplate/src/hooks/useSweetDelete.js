import { db } from "firebase-app/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

const useSweetDelete = () => {
  const handleDelete = (itemId, table) => {
    const colRef = doc(db, table, itemId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };
  return {
    handleDelete,
  };
};

export default useSweetDelete;
