import {ProfileInterface} from "./profile.interface";

export interface PostCreateDto {
  "title": string,
  "content": string,
  "authorId": number
}


export interface PostInterface {
  id: number;
  title: string;
  content: string;
  author: ProfileInterface;
  images: string[];
  createdAt: string;
  updatedAt: string;
  comments: CommentInterface[];
}

export interface CommentInterface {
  id: number;
  text: string;
  author: ProfileInterface;
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCreateDto {
  text: string;
  authorId: number;
  postId: number;
  // commentId: number;
}

