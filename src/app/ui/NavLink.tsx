"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  text: string;
  href: string;
  icons: ReactNode[];
};

const NavLink = ({ text, href, icons }: NavLinkProps) => {
  const currentPath = usePathname();

  return (
    <Link
      className={`flex items-center gap-2 cursor-pointer border-b-2 transition duration-300 ${
        currentPath === href
          ? "text-orange-500 border-orange-500"
          : "border-transparent hover:text-orange-500 hover:border-orange-500"
      }`}
      href={href}
    >
      {icons.map((icon, index) => (
        <>{icon}</>
      ))}
      {text}
    </Link>
  );
};

export default NavLink;
