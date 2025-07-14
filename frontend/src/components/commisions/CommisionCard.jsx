import React from "react";
import { Badge } from "../ui/Badge";
import { ArrowUpRight } from "lucide-react";

const CommissionCard = ({ commission }) => {
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{commission.marketing}</h3>
          <p className="text-gray-600">
            {commission.bulan} {commission.tahun}
          </p>
        </div>
        <Badge
          variant={commission.komisi_persen > 0 ? "success" : "neutral"}
          className="text-sm"
        >
          {commission.komisi_persen}%
        </Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-gray-600 text-sm">Omzet</p>
          <p className="font-medium">{formatRupiah(commission.omzet)}</p>
        </div>

        <div className="bg-blue-50 p-3 rounded-md">
          <p className="text-blue-600 text-sm">Komisi</p>
          <p
            className={`font-medium ${
              commission.komisi_nominal > 0 ? "text-blue-700" : "text-gray-500"
            }`}
          >
            {formatRupiah(commission.komisi_nominal)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="flex items-center text-sm text-primary hover:text-secondary">
          Detail <ArrowUpRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default CommissionCard;
