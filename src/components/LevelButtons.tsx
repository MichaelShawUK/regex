import { LevelButtonsProps } from "../types";

const LevelButtons = (props: LevelButtonsProps) => {
  const hasPrevLevel = props.level > 0;
  const hasNextLevel = props.level < props.maxLevel;

  return (
    <>
      {hasPrevLevel && (
        <button onClick={props.onPrevLevel} className="prev btn">
          &lt;
        </button>
      )}
      {hasNextLevel && (
        <button onClick={props.onNextLevel} className="next btn">
          &gt;
        </button>
      )}
    </>
  );
};

export default LevelButtons;
