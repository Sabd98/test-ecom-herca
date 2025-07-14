import { BarChart, CreditCard, LayoutDashboard } from "lucide-react";
import { Link } from "react-router";

// Komponen Sidebar
const Sidebar = () => (
  <aside className="hidden md:flex md:w-64 bg-gray-800 text-white">
    <div className="w-full py-6 px-4">
      <div className="flex items-center mb-8 px-2">
        <div className="bg-primary p-2 rounded-lg mr-3">
          <LayoutDashboard size={24} />
        </div>
        <h1 className="text-xl font-bold">E-COM Payment</h1>
      </div>

      <nav>
        <Link
          to="/"
          className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-700 mb-2"
        >
          <BarChart className="mr-3" size={20} />
          <span>Komisi</span>
        </Link>
        <Link
          to="/sales"
          className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-700"
        >
          <CreditCard className="mr-3" size={20} />
          <span>Transaksi</span>
        </Link>
      </nav>
    </div>
  </aside>
);

export default Sidebar;
