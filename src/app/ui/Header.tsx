"use client";

import React from 'react';
import Link from 'next/link';
import { FaCog, FaCaretDown } from 'react-icons/fa';

export default function Header() {
    return (
        <header className='flex flex-row justify-between bg-black text-white text-sm'>
            <div className='flex items-center ml-6 gap-10'>
                <img src="/CALMEDICA_LOGO.png" className='w-40 h-16 object-contain' />
                <p className='flex items-center gap-1 hover:text-orange-500 cursor-pointer'>Aide <FaCaretDown /></p>
            </div>
            <nav className='flex justify-center items-center gap-6 mr-1'>
                <Link className='hover:text-orange-500 cursor-pointer' href="/">Afficher les patients</Link>
                <Link className='hover:text-orange-500 cursor-pointer' href="/">Liste d&apos;attente</Link>
                <Link className='hover:text-orange-500 cursor-pointer' href="/">Rapport</Link>
                <Link className='hover:text-orange-500 cursor-pointer' href="/">Tableau de bord</Link>
                <Link className='hover:text-orange-500 cursor-pointer' href="/">Autorisation</Link>
                <Link className='hover:text-orange-500 cursor-pointer' href="/">Statistiques</Link>
                <Link className='flex items-center gap-1 hover:text-orange-500 cursor-pointer' href="/"><FaCog /> <FaCaretDown /></Link>
            </nav>
        </header>
    );
}
