export interface BaseLevel {
  type: "find" | "replace";
  instructions: string;
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
  levelData: FindLevel | ReplaceLevel;
}
