"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navs = [
  { title: "USER", pathname: "/user" },
  { title: "INTERVIEW", pathname: "/interview" },
  // TODO: Remove and decide how to navigate to this page
  { title: "INTERVIEW SETUP", pathname: "/interview/setup" },
  { title: "SCHEDULING", pathname: "/scheduling" },
];

interface NavComponentProps {
  nav: { title: string; pathname: string };
  isSelected: boolean;
}

const NavComponent = ({ nav, isSelected }: NavComponentProps) => {
  return (
    <Link
      href={nav.pathname}
      className={`${
        isSelected ? "bg-indigo-500 text-white" : ""
      } cursor-pointer p-2 rounded-lg font-semibold`}
    >
      {nav.title}
    </Link>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const [selectedNav, setSelectedNav] = useState("");

  useEffect(() => {
    const sortedNavs = [...navs].sort(
      (a, b) => b.pathname.length - a.pathname.length
    );

    const currentNav = sortedNavs.find(
      (nav) =>
        pathname === nav.pathname || pathname.startsWith(nav.pathname + "/")
    );

    if (currentNav) {
      setSelectedNav(currentNav.title);
    }
  }, [pathname]);

  return (
    <div className="w-[200px] flex flex-col">
      {navs.map((nav, index) => (
        <NavComponent
          key={index}
          isSelected={selectedNav === nav.title}
          nav={nav}
        />
      ))}
    </div>
  );
};

export default Sidebar;
