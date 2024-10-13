import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore';
import { firebaseConfig } from '../../firebase-config';
import { LinkInfo } from '../../types';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getDocuments = async () => {
  const linkCollection = collection(db, 'links');
  const linkDocuments = await getDocs(linkCollection);
  return linkDocuments.docs.map<LinkInfo>((doc: DocumentData) => {
    return { id: doc.id, ...doc.data() };
  });
};

export const getUserDocuments = async (user: string) => {
  const linkCollection = collection(db, 'links');
  const linkDocuments = await getDocs(linkCollection);
  return linkDocuments.docs
    .map<LinkInfo>((doc: DocumentData) => {
      return { id: doc.id, ...doc.data() };
    })
    .filter((linkInfo: LinkInfo) => linkInfo.userName === user);
};
