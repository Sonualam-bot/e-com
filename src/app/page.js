import Homepage from "@/components/website/Homepage";
import Navbar from "@/components/website/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full  ">
      <Navbar />
      <Homepage />
    </main>
  );
}
