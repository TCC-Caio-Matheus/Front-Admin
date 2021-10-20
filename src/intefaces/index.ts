export interface Question {
  type: string;
  title: string;
  score?: number;
  awnsers?: any;
  recommendations?: Array<Recommendation>;
}

export interface Awnser {
  description: string;
  score: number;
}

export interface Recommendation {
  description: string;
  minRange: number;
  maxRange: number;
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
  id:string,
  name:string,
  score:number,
  questions:Array<any>
} 