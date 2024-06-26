"use client";

import Image from "next/image";
import NavLink from "./NavLink";
import {
  FaCaretDown,
  FaChartLine,
  FaChartPie,
  FaCog,
  FaListAlt,
  FaLock,
  FaQuestionCircle,
  FaTachometerAlt,
  FaUserFriends,
} from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex flex-col bg-neutral-300 text-white text-sm">
      <Image
        src="/CALMEDICA_LOGO.png"
        width={120}
        height={40}
        className="w-40 h-16 object-contain ml-5 my-2"
        alt="Calmedica logo"
      />
      <nav className="flex items-center justify-between gap-6 h-16 border-y-2 border-gray-600">
        <div className="flex flex-row ml-14 gap-7 h-full">
          <NavLink text="Tous les patients" href="/" icons={[<FaUserFriends />]} />
          <NavLink text="Liste d'attente" href="/waiting-list" icons={[<FaListAlt />]} />
          <NavLink text="Rapport" href="/report" icons={[<FaChartLine />]} />
          <NavLink text="Tableau de bord" href="/dashboard" icons={[<FaTachometerAlt />]} />
          <NavLink text="Statistiques" href="/statistics" icons={[<FaChartPie />]} />
        </div>
        <div className="flex flex-row mr-3 gap-7 h-full">
          <NavLink text="Autorisation" href="/authorization" icons={[<FaLock />]} />
          <NavLink text="" href="/help" icons={[<FaQuestionCircle />, <FaCaretDown />]} />
          <NavLink text="" href="/settings" icons={[<FaCog />, <FaCaretDown />]} />
        </div>
      </nav>
    </header>
  );
}