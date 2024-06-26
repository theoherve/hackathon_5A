"use client";

import React from 'react';
import { Modal, Table, Tooltip } from 'antd';
import Image from "next/image"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCog, FaCaretDown, FaUserFriends, FaListAlt, FaChartLine, FaTachometerAlt, FaChartPie, FaLock, FaQuestionCircle } from 'react-icons/fa';

export default function Header() {
    const currentPath = usePathname();

  return (
    <header className='flex flex-col bg-black text-white text-sm'>
        <Image src="/CALMEDICA_LOGO.png" width={120} height={40} className='w-40 h-16 object-contain ml-5 my-2'  alt="Calmedica logo"/>
        <nav className='flex items-center justify-between gap-6 h-16 border-y-2 border-gray-600'>
        <div className='flex flex-row ml-14 gap-7 h-full'>
            <Link className={`flex items-center gap-2 cursor-pointer border-b-2 transition duration-300 ${currentPath === '/' ? 'text-orange-500 border-orange-500' : 'border-transparent hover:text-orange-500 hover:border-orange-500'}`} href="/">
            <FaUserFriends /> Tous les patients
            </Link>
            <Link className={`flex items-center gap-2 cursor-pointer border-b-2 transition duration-300 ${currentPath === '/waiting-list' ? 'text-orange-500 border-orange-500' : 'border-transparent hover:text-orange-500 hover:border-orange-500'}`} href="/waiting-list">
            <FaListAlt /> Liste d&apos;attente
            </Link>
            <Link className={`flex items-center gap-2 cursor-pointer border-b-2 transition duration-300 ${currentPath === '/report' ? 'text-orange-500 border-orange-500' : 'border-transparent hover:text-orange-500 hover:border-orange-500'}`} href="/report">
            <FaChartLine /> Rapport
            </Link>
            <Link className={`flex items-center gap-2 cursor-pointer border-b-2 transition duration-300 ${currentPath === '/dashboard' ? 'text-orange-500 border-orange-500' : 'border-transparent hover:text-orange-500 hover:border-orange-500'}`} href="/dashboard">
            <FaTachometerAlt /> Tableau de bord
            </Link>
            <Link className={`flex items-center gap-2 cursor-pointer border-b-2 transition duration-300 ${currentPath === '/statistics' ? 'text-orange-500 border-orange-500' : 'border-transparent hover:text-orange-500 hover:border-orange-500'}`} href="/statistics">
            <FaChartPie /> Statistiques
            </Link>
        </div>
        <div className='flex flex-row mr-3 gap-7 h-full'>
            <Link className={`flex items-center gap-2 cursor-pointer border-b-2 transition duration-300 ${currentPath === '/authorization' ? 'text-orange-500 border-orange-500' : 'border-transparent hover:text-orange-500 hover:border-orange-500'}`} href="/authorization">
            <FaLock /> Autorisation
            </Link>
            <Link className={`flex items-center gap-1 cursor-pointer border-b-2 transition duration-300 ${currentPath === '/help' ? 'text-orange-500 border-orange-500' : 'border-transparent hover:text-orange-500 hover:border-orange-500'}`} href="/help">
            <FaQuestionCircle /> Aide <FaCaretDown />
            </Link>
            <Link className={`flex items-center gap-1 cursor-pointer border-b-2 transition duration-300 ${currentPath === '/settings' ? 'text-orange-500 border-orange-500' : 'border-transparent hover:text-orange-500 hover:border-orange-500'}`} href="/settings">
            <FaCog /> <FaCaretDown />
            </Link>
        </div>
        </nav>
    </header>
    );
};
