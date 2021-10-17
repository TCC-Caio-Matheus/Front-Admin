export interface Question {
  type: string;
  title: string;
  score: number;
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
