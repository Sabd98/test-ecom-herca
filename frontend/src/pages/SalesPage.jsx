import { useState, useEffect, useCallback } from "react";
import SalesTable from "../components/payments/SalesTable";
import { getSales } from "../services/paymentService";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { Funnel } from "lucide-react";

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

 const fetchSales = useCallback(async () => {
   try {
     const data = await getSales();
     setSales(data);
   } catch (err) {
     setError(err.message);
   } finally {
     setLoading(false);
   }
 }, []);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const filteredSales = sales.filter(
    (sale) =>
      sale.transaction_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (sale.marketing?.name &&
        sale.marketing.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-slate-200 rounded-lg shadow-lg p-6">
        <article className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Daftar Transaksi Penjualan
          </h1>

          <div className="flex gap-3 mt-4 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary w-full md:w-64"
              />
              <Funnel
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>

            {/* <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary flex items-center">
              <Plus size={18} className="mr-1" /> Transaksi
            </button> */}
          </div>
        </article>

        {filteredSales.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm
              ? "Tidak ditemukan transaksi yang sesuai"
              : "Tidak ada data transaksi"}
          </div>
        ) : (
          <SalesTable sales={filteredSales} />
        )}
      </div>
    </section>
  );
};

export default SalesPage;
