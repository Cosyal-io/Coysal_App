import Image from "next/image";
import { Button } from "../../s/components/ui/button"; // Import Button from Shadcn UI




// Header component
const Header = () => (
  <header className="flex justify-between items-center p-4 text-black shadow-md w-full">
    <div className="flex items-center">
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
      <h1 className="ml-2 text-2xl font-bold">Coysal</h1>
    </div>
    <nav className="flex space-x-6">
      <a href="#" className="hover:text-gray-400 transition">All</a>
      <a href="#" className="hover:text-gray-400 transition">Art</a>
      <a href="#" className="hover:text-gray-400 transition">Gaming</a>
      <a href="#" className="hover:text-gray-400 transition">Memberships</a>
      <a href="#" className="hover:text-gray-400 transition">PFPs</a>
      <a href="#" className="hover:text-gray-400 transition">Photography</a>
      <a href="#" className="hover:text-gray-400 transition">Music</a>
    </nav>
    <Button variant="secondary" className="bg-blue-600 hover:bg-blue-700 transition">Login</Button>
  </header>
);

// Footer component
const Footer = () => (
  <footer className="flex justify-between p-4">
    <div>© 2023 Coysal Project</div> {/* Company Name */}
    <div>
      <a href="/about">About</a>
      <a href="/contact" className="ml-4">Contact</a>
    </div>
  </footer>
);

const MainContent = () => (
  <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {/* Example items */}
    <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="text-lg font-semibold">Reforestation Project</h2>
      <p className="text-gray-600">Credits: 100</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="text-lg font-semibold">Wetland Restoration</h2>
      <p className="text-gray-600">Credits: 150</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="text-lg font-semibold">Solar Energy Initiative</h2>
      <p className="text-gray-600">Credits: 200</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="text-lg font-semibold">Ocean Cleanup Project</h2>
      <p className="text-gray-600">Credits: 80</p>
    </div>
    {/* Add more items as needed */}
  </main>
);


export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header /> {/* Include Header */}
      <MainContent />
      <Footer /> {/* Include Footer */}
    </div>
  );
}
