export interface Question {
  type: string;
  title: string;
  grade: number;
  awnsers?: any;
}

export interface Recommendation {
  description: string;
  minRange: number;
  maxRange: number;
}
