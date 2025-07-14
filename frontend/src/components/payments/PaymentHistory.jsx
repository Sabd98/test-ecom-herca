import { format } from "date-fns";
import { id } from "date-fns/locale";
import Badge from "../ui/Badge";

const PaymentHistory = ({ paymentHistory }) => {
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (
    !paymentHistory.payment_history ||
    paymentHistory.payment_history.length === 0
  ) {
    return (
      <div className="text-center py-8 text-gray-500">
        Belum ada riwayat pembayaran
      </div>
    );
  }

  return (
    <div>
      <article className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 font-semibold">Tanggal</th>
              <th className="py-2 px-4 font-semibold">Jumlah Bayar</th>
              <th className="py-2 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.payment_history.map((payment, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  {format(new Date(payment.payment_date), "dd MMMM yyyy", {
                    locale: id,
                  })}
                </td>
                <td className="py-3 px-4 font-medium text-green-600">
                  {formatRupiah(payment.amount_paid)}
                </td>
                <td className="py-3 px-4">
                  <Badge variant="success">Berhasil</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Total Terbayar:</span>
          <span className="font-bold">
            {formatRupiah(paymentHistory.total_paid)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Sisa Tagihan:</span>
          <span
            className={`font-bold ${
              paymentHistory.bill_remain > 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {formatRupiah(paymentHistory.bill_remain)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
