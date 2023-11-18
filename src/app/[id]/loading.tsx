import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="container mx-auto flex flex-col justify-center mt-3">
      <div>
        <Image
          src="/Infinity_loading.gif"
          width={400}
          height={400}
          alt="loading animation"
          className="mx-auto"
        />
      </div>
      <div className="text-center">
        <h1>ページの読み込み中です...</h1>
      </div>
    </div>
  );
}
