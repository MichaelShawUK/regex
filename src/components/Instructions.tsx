const Instructions = (props: { data: string[] }) => {
  const content = props.data.map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ));

  return <div className="instructions">{content}</div>;
};

export default Instructions;
