import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Link  href='./footer'> footer </Link>
      <Link  href='./FAQ'> faq </Link>
      <Link  href='./FAQ/faq-admin'> FAQ admin </Link>
    </div>
  );
}
