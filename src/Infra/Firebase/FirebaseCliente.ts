import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import 'firebase/firestore';
import firebaseConfig from '../../Main/Config/FirebaseConfig';

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
