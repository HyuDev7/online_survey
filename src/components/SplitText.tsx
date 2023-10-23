import { v4 as uuidv4 } from 'uuid';

export default function SplitText(props: { text: any }): any {
  const textArray = props.text.split("¥n");

  let count = 0;
  return textArray.map((line: string) => {
    return <div key={uuidv4()}>{line.replace("¥n", "")}</div>;
  });
}
