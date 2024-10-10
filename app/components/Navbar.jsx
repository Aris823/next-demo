import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-red-600 p-4 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link href="/">Car Management v.20</Link>
        </div>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:bg-red-900 px-3 py-2 rounded-md">
            Home
          </Link>
          <Link href="/model" className="text-white hover:bg-red-900 px-3 py-2 rounded-md">
             Model
          </Link>
          <Link href="/brand" className="text-white  hover:bg-red-900 px-3 py-2 rounded-md">
            Brand
          </Link>
         
        </div>
      </div>
    </nav>
  );
}
