// submitData.ts
import { doc, setDoc } from 'firebase/firestore';
import db from '../firebaseConfig';
import { generateHash } from '../utils/generateHash';

interface SubmitDataParams<T> {
  collectionName: string;
  data: T;
  validateData: (data: T) => boolean;
  navigate: (path: string) => void;
  navigatePath: string;
}
const submitData = async <T extends { [key: string]: any }>({
  collectionName,
  data,
  validateData,
  navigate,
  navigatePath
}: SubmitDataParams<T>): Promise<void> => {
  if (!validateData(data)) {
    return;
  }

  try {
    const documentId = generateHash(JSON.stringify(data));
    if (documentId) {
      await setDoc(doc(db, collectionName, documentId), data);
      navigate(navigatePath);
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};

export default submitData;
