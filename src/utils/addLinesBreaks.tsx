import StrNewLineToBr from "./StrNewLineToBr";

export default function addLineBreaks(
  jsx: (string | JSX.Element)[]
): (string | JSX.Element)[] {
  const formatJsx: (string | JSX.Element)[] = [];

  jsx.forEach((element) => {
    if (typeof element === "string") {
      formatJsx.push(...StrNewLineToBr(element));
    } else {
      if (element.props.children) {
        const content = StrNewLineToBr(element.props.children);
        formatJsx.push(
          <span className={element.props.className}>{content}</span>
        );
      } else formatJsx.push(element);
    }
  });

  return formatJsx;
}
