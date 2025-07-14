import { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { getCommissions } from "../services/commisionsService";
import CommissionTable from "../components/commisions/CommisionTable";

const CommissionPage = () => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const fetchCommissions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCommissions(filters.month, filters.year);
      setCommissions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters.month, filters.year]);

  useEffect(() => {
    fetchCommissions();
  }, [fetchCommissions, filters]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-slate-200 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Laporan Komisi Marketing
        </h1>

        <nav className="flex flex-wrap gap-4 mb-6">
          <div className="w-full md:w-48">
            <label className="block text-gray-700 mb-2">Bulan</label>
            <select
              value={filters.month}
              onChange={(e) => handleFilterChange("month", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {[...Array(12).keys()].map((month) => (
                <option key={month + 1} value={month + 1}>
                  {new Date(0, month).toLocaleString("id-ID", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-48">
            <label className="block text-gray-700 mb-2">Tahun</label>
            <select
              value={filters.year}
              onChange={(e) => handleFilterChange("year", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {[...Array(5).keys()].map((i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </nav>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
        ) : commissions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Tidak ada data komisi untuk periode ini
          </div>
        ) : (
          <CommissionTable commissions={commissions} />
        )}
      </div>
    </section>
  );
};

export default CommissionPage;
