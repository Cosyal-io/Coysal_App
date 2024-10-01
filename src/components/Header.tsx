"use client"
import { useState } from "react";
import Image from "next/image";
import { Button } from "s/components/ui/button"; // Import Button from Shadcn UI
import Link from "next/link";
import CsvUploadModal from "./CsvUploadModal"; // Import the CsvUploadModal component


const Header = () =>  {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // State to manage modal visibility
  return (
      <header className="flex justify-between items-center mt-0 pt-0 px-4 py-2 text-black shadow-md w-full bg-white">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="ml-2 text-xl font-bold">Coysal</h1>
        </div>
        <nav>
          <Button 
            onClick={() => setIsSignUpModalOpen(true)} 
            className="border border-black bg-black text-white hover:bg-gray-900 transition rounded-md px-3 py-1 text-sm"
          >
            SignUp Wallet
          </Button>
        </nav>
      </header>

  );
}

export default Header;