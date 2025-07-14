import { Link } from "react-router";
import Badge from "../ui/Badge";
import { NotepadText } from "lucide-react";

const SalesTable = ({ sales }) => {
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              No. Transaksi
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Tanggal
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Marketing
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Total
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Status
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sales.map((sale) => (
            <tr key={sale.id} className="hover:bg-gray-50">
              <td className="py-3 px-4">{sale.transaction_number}</td>
              <td className="py-3 px-4">{formatDate(sale.date)}</td>
              <td className="py-3 px-4">{sale.marketing?.name || "-"}</td>
              <td className="py-3 px-4">{formatRupiah(sale.grand_total)}</td>
              <td className="py-3 px-4">
                <Badge
                  variant={
                    sale.total_paid >= sale.grand_total
                      ? "success"
                      : "warning"
                  }
                >
                  {sale.total_paid >= sale.grand_total
                    ? "Lunas"
                    : "Belum Lunas"}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <Link
                  to={`/payments/${sale.id}`}
                  className="text-primary hover:text-secondary font-medium"
                >
                 <NotepadText />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
