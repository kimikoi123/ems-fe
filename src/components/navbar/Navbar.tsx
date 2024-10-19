"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("ACCESS_TOKEN");
    router.push("/login");
  };

  return (
    <nav className="bg-white p-4 flex justify-between items-center">
      <ul className="flex space-x-4 text-black font-bold">
        <li>
          <Link href="/user" className="hover:underline">
            Navbar
          </Link>
        </li>
      </ul>
      <button onClick={handleLogout} className="hover:underline text-red-500">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
