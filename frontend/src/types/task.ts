export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Task {
  id: string;
  title: string;
  desc: string;
  emoji: string;
  difficulty: Difficulty;
  xp: number;
  completed: boolean;
  proof?: string;
}
