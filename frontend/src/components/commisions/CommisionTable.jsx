
const CommissionTable = ({ commissions }) => {
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Marketing
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Bulan
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Tahun
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Omzet
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Komisi (%)
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Komisi (Rp)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {commissions.map((commission, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4">{commission.marketing}</td>
              <td className="py-3 px-4">{commission.bulan}</td>
              <td className="py-3 px-4">{commission.tahun}</td>
              <td className="py-3 px-4">{formatRupiah(commission.omzet)}</td>
              <td className="py-3 px-4">{commission.komisi_persen}%</td>
              <td
                className={`py-3 px-4 font-medium ${
                  commission.komisi_nominal > 0
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {formatRupiah(commission.komisi_nominal)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CommissionTable;
