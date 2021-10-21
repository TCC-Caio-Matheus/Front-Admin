export interface Question {
  type: string;
  id?: string;
  title: string;
  score?: number;
  question_options?: Array<QuestionOption>;
  suggestions?: Array<Suggestion>;
}

export interface Awnser {
  description: string;
  score: number;
}

export interface Suggestion {
  id?: string;
  description: string;
  range_min: number;
  range_max: number;
  question?: string;
}
export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (data: UserCredentials) => Promise<void>;
}

export interface Quiz {
  id: string;
  name: string;
  score: number;
  questions: Array<any>;
}

export interface QuestionOption {
  id?: string;
  description: string;
  score: number;
  question?: string;
}
