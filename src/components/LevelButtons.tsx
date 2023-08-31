import { LevelButtonsProps } from "../types";

const LevelButtons = (props: LevelButtonsProps) => {
  const hasPrevLevel = props.level > 0;
  const hasNextLevel = props.level < props.maxLevel;

  return (
    <>
      {hasPrevLevel && (
        <button onClick={props.onPrevLevel} className="prev btn">
          Prev
        </button>
      )}
      {hasNextLevel && (
        <button onClick={props.onNextLevel} className="next btn">
          Next
        </button>
      )}
    </>
  );
};

export default LevelButtons;
