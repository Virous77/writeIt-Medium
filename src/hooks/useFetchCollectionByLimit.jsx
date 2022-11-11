import { useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/firebase.config";

const useFetchCollectionByLimit = (tag, collections) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCollection = () => {
    setLoading(true);
    const productRef = collection(db, collections);
    const items = query(
      productRef,
      where("tags", "==", `${tag}`),
      orderBy("createdAt", "desc"),

      limit(5)
    );

    onSnapshot(items, (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(allProducts);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCollection();
  }, []);

  return {
    data,
    loading,
  };
};

export default useFetchCollectionByLimit;
