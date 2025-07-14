import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div className="flex gap-4 text-blue-500 cursor-pointer">
        <Link href="/articles/1">Article 1</Link>
        <Link href="/articles/2">Article 2</Link>
        <Link href="/articles/3">Article 3</Link>
      </div>

    </div>
  );
}
