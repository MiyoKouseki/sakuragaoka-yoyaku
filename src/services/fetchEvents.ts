import { getAuth } from 'firebase/auth';
import { fetchCollectionData } from '../services/firestoreServices';

interface QueryParams {
  collectionName: string;
  fieldName?: string;
  value?: any;
}

export const fetchEvents = async (params: QueryParams) => {
  const { collectionName, fieldName, value } = params;

  try {
    const fetchedData = await fetchCollectionData(collectionName, fieldName, value);
    const isUserAuthenticated = !!getAuth().currentUser;

    return fetchedData.map((data: any) => ({
      ...data,
      start: new Date(data.startTime),
      end: new Date(data.endTime),
      title: isUserAuthenticated
        ? `${data.organizationName} - ${data.roomName}`
        : data.roomName,
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
