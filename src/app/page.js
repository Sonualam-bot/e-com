import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full pt-20 ">
      Hello
      <Link href={"/product"}>Shop now</Link>
    </main>
  );
}
