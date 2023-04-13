import { Community } from "@/core/entities/community.type";
import { Timestamp } from "firebase/firestore/lite";

export type FirebaseComment = {
  message: string;
  user_id: string;
  created_at: Timestamp;
  id: string;
  likes: number;
  deslikes: number;
};

export type FirebaseCommunity = {
  id: string;
  comments: FirebaseComment[];
  logo_img: string;
  stock_slug: string;
};

export const communityMapper = {
  toEntity: (document: FirebaseCommunity, id: string) =>
    new Community({
      comments: document.comments.map((comment) => ({
        created_at: comment.created_at.toDate(),
        deslikes: comment.deslikes,
        id: comment.id,
        likes: comment.likes,
        message: comment.message,
        user_id: comment.user_id,
      })),
      id,
      logo_img: document.logo_img,
      stock_slug: document.stock_slug,
    }),
};
