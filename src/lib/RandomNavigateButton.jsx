import Link from "next/link";

export default function RandomNavigateButton(props) {
  const randomValue = Math.random();
  let childpass=""
  if (randomValue < 0.5) {
     childpass = props.childpass1;
  } else {
     childpass = props.childpass2;
  }

  return (
    <div className="my-2 rounded-lg border border-solid border-gray-500 p-1.5">
      <Link href={`/${props.parentpass}/${childpass}`}>実験開始</Link>
    </div>
  );
}
