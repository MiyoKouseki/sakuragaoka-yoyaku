//SubmitDataParams.ts
import { Room } from './Room';
import { Organization } from './Organization';
import { Firestore, DocumentData, WithFieldValue, setDoc, doc } from 'firebase/firestore';

export interface SubmitDataParams<T> {
    collectionName: string;
    data: T;
    validateData: (data: T) => boolean;
    navigatePath: string;
  }
  