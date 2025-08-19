import Link from "next/link";

export function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 hover:text-indigo-600"
        >
          My Blog
        </Link>

        <Link
          href="/posts/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create Post
        </Link>
      </nav>
    </header>
  );
}
