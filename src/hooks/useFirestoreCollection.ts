// useFirestoreCollection.ts
import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

interface WithId {
  id: string;
}

const firestore = getFirestore();

function useFirestoreCollection<T extends WithId>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, collectionName));
      const dataList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
      setData(dataList);
    };

    fetchData();
  }, [collectionName]);

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(firestore, collectionName, id));
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  return { data, deleteItem };
}

export default useFirestoreCollection;
