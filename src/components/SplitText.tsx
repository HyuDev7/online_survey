export default function SplitText(props: { text: any }): any {
  const textArray = props.text.split("¥n");

  return textArray.map((line: string) => {
    // console.log(line.replace("¥n", ""));
    return <div>{line.replace("¥n", "")}</div>;
  });
}
