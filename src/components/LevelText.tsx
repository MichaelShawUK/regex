const LevelText = ({ children }: { children: (string | JSX.Element)[] }) => {
  return (
    <div className="level-text">
      <p>{children}</p>
    </div>
  );
};

export default LevelText;
