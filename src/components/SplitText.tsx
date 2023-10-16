export default function SplitText(props: { text: any }): any {
  const textArray = props.text.split("¥n");

  let count = 0;
  return textArray.map((line: string) => {
    return <div key={count + 1}>{line.replace("¥n", "")}</div>;
  });
}
