import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex items-center flex-col gap-4 min-h-[70vh]">
      <Link href="/">
        <Image src="/greymon.png" width={300} height={300} alt="Aplocalymon" />
      </Link>
      <h3 className="text-5xl text-gray-300 italic">404 Not found</h3>
    </div>
  );
}
