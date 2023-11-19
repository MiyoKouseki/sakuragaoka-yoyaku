// submitData.ts
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { generateHash } from '../utils/generateHash';

interface SubmitDataParams<T> {
  collectionName: string;
  data: T;
  validateData: (data: T) => boolean;
  navigate: (path: string) => void;
  navigatePath: string;
}
const SubmitData = async <T extends { [key: string]: any }>({
  collectionName,
  data,
  validateData,
  navigate,
  navigatePath
}: SubmitDataParams<T>): Promise<void> => {
  if (!validateData(data)) {
    return;
  } else {
    console.log('invalid data');
  }

  try {
    const orgQuery = query(collection(db, collectionName), where('name', '==', data.name));
    const querySnapshot = await getDocs(orgQuery);
    if (!querySnapshot.empty) {
      alert('この団体名は既に使用されています。');
    }
    else {
      const documentId = generateHash(JSON.stringify(data));
      if (documentId) {
        await setDoc(doc(db, collectionName, documentId), data);
        navigate(navigatePath);
      }
      else {
        console.error('no document id.');
      }
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};

export default SubmitData;
