//EditData.ts
import { doc, setDoc } from 'firebase/firestore';
import db from '../firebaseConfig';

interface EditDataParams<T> {
  collectionName: string;
  data: T;
  validateData: (data: T) => boolean;
  navigate: (path: string) => void;
  navigatePath: string;
  documentId: string;
}
const submitData = async <T extends { [key: string]: any }>({
  collectionName,
  data,
  validateData,
  navigate,
  navigatePath,
  documentId
}: EditDataParams<T>): Promise<void> => {
  if (!validateData(data)) {
    return;
  }

  try {
    if (documentId) {
      await setDoc(doc(db, collectionName, documentId), data);
      navigate(navigatePath);
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};

export default submitData;
