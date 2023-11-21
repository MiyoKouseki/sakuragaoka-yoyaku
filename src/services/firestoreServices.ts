// firestoreService.ts
import { collection, getFirestore, query, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';

// Firestoreのドキュメントからデータを取得して汎用的な型に変換するための関数
const docToData = <T>(doc: QueryDocumentSnapshot): T => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
  } as T;
};

// 任意のFirestoreコレクションからデータを取得する汎用的な関数
export const fetchCollectionData = async <T>(collectionName: string): Promise<T[]> => {
  const db = getFirestore();
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const items: T[] = [];

  querySnapshot.forEach((doc) => {
    items.push(docToData<T>(doc));
  });

  return items;
};
