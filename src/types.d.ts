export interface RegexProps {
  initialText: string;
}

// export interface LevelData {
//   type: "find" | "replace";
//   instructions: string;
//   text: string;
// }

export interface FindLevel extends LevelData {
  matches: string[];
}

export interface ReplaceLevel extends LevelData {
  output: string;
}

export interface LevelData {
  type: string;
  instructions: string;
  matches: string[];
  readonly text: string;
}
