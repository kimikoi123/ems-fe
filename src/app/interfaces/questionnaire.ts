export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  question: string;
  options: string[];
}

export interface Questionnaire {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  total: number;
  questions?: Question[];
}
