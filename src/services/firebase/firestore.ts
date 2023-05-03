import { Community } from "@/core/entities/community.type";
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { app } from ".";
import { FirebaseCommunity, communityMapper } from "./mappers";

export const firestoreDatabase = getFirestore(app);

type CreateCommunityInput = {
  name: string;
  stock_slug: string;
  logo_img: string;
};

export const createCommunity = async (payload: CreateCommunityInput) => {
  const docRef = await addDoc(
    collection(firestoreDatabase, "communities"),
    payload
  );
  console.log("Document written with ID: ", docRef.id);

  return docRef.id;
};

export const getCommunityBySlug = async (slug: string) => {
  const communitiesRef = collection(firestoreDatabase, "communities");

  const q = query(communitiesRef, where("stock_slug", "==", slug));

  const response = await getDocs(q);

  const document = response.docs.find((doc) => doc.exists());

  return document
    ? new Community({
        comments: document.data().comments || [],
        id: document.id,
        logo_img: document.data().logo_img,
        stock_slug: document.data().stock_slug,
      })
    : null;
};

export const getCommunityById = async (
  id: string
): Promise<Community | null> => {
  const databaseItemRef = doc(firestoreDatabase, "communities", id);

  const document = await getDoc<FirebaseCommunity>(databaseItemRef as any);

  const community = document?.exists()
    ? communityMapper.toEntity(document.data(), document.id)
    : null;

  return community;
};

type CreateCommentInput = {
  community_id: string;
  user_id: string;
  message: string;
};


export async function createComment({
  community_id,
  message,
  user_id,
}: CreateCommentInput) {
  const community = doc(firestoreDatabase, "communities", community_id);

  const comment = {
    message: message,
    user_id,
    created_at: Timestamp.now(),
    id: Math.random().toString(36).substring(2),
    likes: 0,
    deslikes: 0,
  };

  await updateDoc(community, {
    comments: arrayUnion(comment),
  });
}



