export default function SplitText(props: { text: any }): any {
  const textArray = props.text.split("¥n");

  return textArray.map((line: string) => {
    // console.log(line.replace("¥n", ""));
    let count=0;
    return <div key={count+1}>{line.replace("¥n", "")}</div>;
  });
}
