import { db } from "firebase-app/firebase-config";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

const useLoadmoreAndFilter = (table, numberPerPage = 2, numberLoadmore = 1) => {
  const [dataTable, setDataTable] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const handleFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  const handleLoadmore = () => {
    async function fetchLoadMore() {
      const colRef = collection(db, table);
      const nextRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8"),
            startAfter(lastDoc),
            limit(numberLoadmore)
          )
        : query(colRef, startAfter(lastDoc), limit(numberLoadmore));

      const documentSnapshots = await getDocs(nextRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastVisible);
      onSnapshot(nextRef, (snapshot) => {
        let results = [];
        snapshot.forEach((item) => {
          results.push({
            id: item.id,
            ...item.data(),
          });
        });
        setDataTable([...results, ...dataTable]);
      });
    }
    fetchLoadMore();
  };

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, table);
      // const q = query(colRef, where("status", "==", 1));
      const newRefTotal = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef);

      onSnapshot(newRefTotal, (snapshot) => {
        setTotal(snapshot.size);
      });
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8"),
            limit(numberPerPage)
          )
        : query(colRef, limit(numberPerPage));

      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastVisible);

      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((item) => {
          results.push({
            id: item.id,
            ...item.data(),
          });
        });
        setDataTable(results);
      });
    }
    fetchData();
  }, [filter]);

  return {
    dataTable,
    total,
    handleFilter,
    handleLoadmore,
  };
};

export default useLoadmoreAndFilter;
