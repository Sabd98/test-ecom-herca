import { LayoutDashboard } from "lucide-react";

// Komponen Header
const Header = () => (
  <header className="bg-slate-200 shadow">
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <button className="md:hidden mr-3 text-gray-600">
          <LayoutDashboard size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Welcome to E-COM</h1>
      </div>
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="font-semibold">U</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;