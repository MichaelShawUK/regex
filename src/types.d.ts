import { ChangeEventHandler } from "react";

export interface BaseLevel {
  type: "find" | "replace";
  instructions: string[];
  template: string;
  matches: string[];
  replacements?: string[];
}

export interface BaseLevelWithGetters extends BaseLevel {
  readonly text: string;
  readonly matchPositions: Map<number[], string>;
  readonly initialJsx: (string | JSX.Element)[];
  readonly reference?: string;
}

export interface LevelTemplateProps {
  templateData: BaseLevelWithGetters;
}

export interface LevelButtonsProps {
  level: number;
  maxLevel: number;
  onPrevLevel: () => void;
  onNextLevel: () => void;
}

export interface ReplaceSectionProps {
  text: string;
  desiredOutput: string;
  userInput: { regex: RegExp; replacement: string };
  onReplaceInput: ChangeEventHandler<HTMLInputElement>;
}

export interface LevelTextProps {
  text: string;
  regex: RegExp;
  matchPositions: Map<number[], string>;
}
