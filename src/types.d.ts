// export interface RegexProps {
//   initialText: string;
// }

// export interface LevelData {
//   type: "find" | "replace";
//   instructions: string;
//   text: string;
// }

// export interface FindLevel extends LevelData {
//   matches: string[];
// }

// export interface ReplaceLevel extends LevelData {
//   output: string;
// }

// export interface LevelData {
//   type: string;
//   instructions: string;
//   matches: string[];
//   readonly text: string;
//   replacements?: string[];
//   readonly reference?: string;
// }

interface BaseLevel {
  instructions: string;
  matches: string[];
  template: string;
  readonly text: string;
}

export interface FindLevel extends BaseLevel {
  type: "find";
}

export interface ReplaceLevel extends BaseLevel {
  type: "replace";
  replacements: string[];
  readonly reference: string;
}
