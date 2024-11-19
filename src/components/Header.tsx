'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from 's/components/ui/button';
import Link from 'next/link';
import { Menubar, MenubarMenu, MenubarTrigger } from 's/components/ui/menubar';
import { Client } from 'xrpl';
import  WalletLogin  from './xrpl_wallet_modal';

// TODO: add the emoji: 🍃♻️🏞️💚🌱.
const Header = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // State to manage modal visibility
  return (
    <header className="flex justify-between items-center mt-0 pt-0 px-4 py-2 text-black shadow-md w-full bg-white">
      <div className="flex items-center">
        <h2>🍃♻️🏞️💚🌱</h2>
        <h1 className="ml-2 text-xl font-bold">Coysal</h1>
      </div>
      <nav>
        <Menubar>
          <MenubarMenu>
                  <MenubarTrigger asChild>
                    <Link href="/docs">
                    Docs
                    </Link>
                    </MenubarTrigger>   
          <MenubarTrigger>
                  <MenubarTrigger asChild>
                    <Link href="/Client">
                    Signup
                    </Link>
                    </MenubarTrigger>  
             </MenubarTrigger>
                  <MenubarTrigger asChild>
                    <Link href="/client">
                    Login
                    </Link>
                    </MenubarTrigger>  
          </MenubarMenu>
        </Menubar>
      </nav>
      <nav>
      <WalletLogin/>
        {/* <Button 
            onClick={() => setIsSignUpModalOpen(true)} 
            className="border border-black bg-black text-white hover:bg-gray-900 transition rounded-md px-3 py-1 text-sm"
          >
            SignUp Wallet
          </Button> */}
      </nav>
    </header>
  );
};

export default Header;
