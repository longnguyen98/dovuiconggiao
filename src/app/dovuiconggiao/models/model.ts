import firebase from "firebase";


export interface BaseModel {
  id: string;
}

export interface Question extends BaseModel {
  content: string;
  img: string;
  options: Option[];
  topicIds: string[];
  topics?: Topic[]
  author?: User;
  authorId: string | undefined
  createdTime: string;
  status?: number;
  note?: string;
}

export interface Option extends BaseModel {
  content: string;
  img: string;
  correct: boolean;
  questionId: string;
}

export interface User extends BaseModel {
  name0: string | null;
  name1?: string;
  name2?: string;
  name3?: string;
  location?: string;
  avatar?: string | null;
  email?: string | null;
  roles?: string[] | null;
}

export interface Topic extends BaseModel {
  name: string;
  description: string;
  order: number;
}

export interface Record extends BaseModel {
  topic: Topic;
  topicId: string;
  score: number;
  time: string;
  createdDate: string;
  user: User;
  userId: string;
}

export const COLLECTIONS = {
  QUESTIONS: 'questions',
  TOPICS: 'topics',
  USERS: 'users'
};



