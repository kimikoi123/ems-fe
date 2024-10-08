import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <Link href="/dashboard" className="hover:underline">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
