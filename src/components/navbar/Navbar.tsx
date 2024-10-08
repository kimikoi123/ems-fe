import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white p-4">
      <ul className="flex space-x-4 text-black font-bold">
        <li>
          <Link href="/user" className="hover:underline">
            NAVBAR HERE
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
