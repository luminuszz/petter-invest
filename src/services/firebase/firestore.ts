import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore/lite";
import { app } from ".";

export const firestoreDatabase = getFirestore(app);

type CreateCommunityInput = {
  name: string;
  stock_slug: string;
};

export const createCommunity = async ({
  name,
  stock_slug,
}: CreateCommunityInput) => {
  const docRef = await addDoc(collection(firestoreDatabase, "communities"), {
    name,
    stock_slug,
  });
  console.log("Document written with ID: ", docRef.id);
};

export const getCommunityBySlug = async (slug: string) => {
  const communitiesRef = collection(firestoreDatabase, "communities");

  const q = query(communitiesRef, where("stock_slug", "==", slug));

  const data = await getDocs(q);

  return data.docs.find((doc) => doc.data().stock_slug === slug);
};