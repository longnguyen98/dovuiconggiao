export interface Question {
  id: string;
  content: string;
  img: string;
  options: Option[];
  topics: Topic[]
  author?: User;
  authorId: string
}

export interface Option {
  id: string;
  content: string;
  img: string;
  correct: boolean;
  questionId: string;
}

export interface User{
  id: string;
  name0: string;
  name1: string;
  name2: string;
  name3: string;
  location: string;
  avatar: string;
  email: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
}

export interface Record{
  id: string;
  topic: Topic;
  topicId: string;
  score: number;
  time: string;
  createdDate: string;
  user: User;
  userId: string;
}

