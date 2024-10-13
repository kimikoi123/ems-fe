export type Difficulty = "easy" | "medium" | "hard";

export interface Questionnaire {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  total: number;
}
