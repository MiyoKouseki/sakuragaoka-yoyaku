//FetchData.ts
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebaseConfig';

const FetchData = async <T>(
    collectionName: string,
    documentId: string | undefined,
    setData: React.Dispatch<React.SetStateAction<T>>
) => {
    if (!documentId) return;

    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        setData(docSnap.data() as T);
    }
};

export default FetchData;