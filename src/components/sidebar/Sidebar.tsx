"use client";
import { useState } from "react";
import Link from "next/link";

const navs = [
  { title: "USER", pathname: "/user" },
  { title: "INTERVIEW", pathname: "/interview" },
  { title: "SCHEDULING", pathname: "/scheduling" },
];

interface NavComponentProps {
  nav: { title: string; pathname: string };
  isSelected: boolean;
  handleClickNav: (nav: string) => void;
}

const NavComponent = ({
  nav,
  isSelected,
  handleClickNav,
}: NavComponentProps) => {
  return (
    <Link
      href={nav.pathname}
      className={`${
        isSelected ? "bg-indigo-500 text-white" : ""
      } cursor-pointer p-2 rounded-lg font-semibold`}
      onClick={() => handleClickNav(nav.title)}
    >
      {nav.title}
    </Link>
  );
};

const Sidebar = () => {
  const [selectedNav, setSelectedNav] = useState("USER");

  const handleClickNav = (nav: string) => {
    setSelectedNav(nav);
  };

  return (
    <div className="w-[200px] flex flex-col">
      {navs.map((nav, index) => (
        <NavComponent
          key={index}
          handleClickNav={handleClickNav}
          isSelected={selectedNav === nav.title}
          nav={nav}
        />
      ))}
    </div>
  );
};

export default Sidebar;
