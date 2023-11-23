// firestoreService.ts
import { collection, getFirestore, query, getDocs, QueryDocumentSnapshot, where } from 'firebase/firestore';

const docToData = <T>(doc: QueryDocumentSnapshot): T => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
  } as T;
};

export const fetchCollectionData = async <T>(
  collectionName: string,
  fieldName?: string,
  value?: any
): Promise<T[]> => {
  const db = getFirestore();
  const collectionRef = collection(db, collectionName);
  let q;

  if (fieldName && value !== undefined) {
    // 特定のフィールドに基づいてクエリを作成
    q = query(collectionRef, where(fieldName, '==', value));
  } else {
    // フィールド指定がない場合は、コレクション全体を対象にクエリを作成
    q = query(collectionRef);
  }

  const querySnapshot = await getDocs(q);
  const items: T[] = [];

  querySnapshot.forEach((doc) => {
    items.push(docToData<T>(doc));
  });

  return items;
};
