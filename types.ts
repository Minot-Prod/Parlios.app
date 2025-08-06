
import type { ReactNode } from 'react';

export enum GameState {
  WELCOME,
  THEME_SELECTION,
  STORY_GENERATION,
  STORY_COMPLETE,
}

export enum NarrationState {
  IDLE,
  PLAYING,
  PAUSED,
}

export interface Theme {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  prompt: string;
}

export interface StoryPart {
  storySegment: string;
  question: string;
  choices: string[];
}

export interface StoryHistoryEntry {
  storySegment: string;
  userChoice: string;
}
