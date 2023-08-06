const LevelText = (props: { children: (string | JSX.Element)[] }) => {
  return (
    <div className="level-text">
      <p>{props.children}</p>
    </div>
  );
};

export default LevelText;
