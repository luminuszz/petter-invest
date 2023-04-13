import { Timestamp } from "firebase/firestore/lite";

export type Comment = {
  user_id?: string;
  message: string;
  created_at: Date | Timestamp;
  id: string;
  likes: number;
  deslikes: number;
};

export type CommunityProps = {
  id: string;
  stock_slug: string;
  comments: Comment[];
  logo_img: string;
};

export class Community {
  public readonly props: CommunityProps;

  constructor(props: CommunityProps) {
    this.props = props;
  }

  public get id() {
    return this.props.id;
  }

  public get stock_slug() {
    return this.props.stock_slug;
  }

  public get comments() {
    return this.props.comments;
  }
}
