import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import PaymentForm from "../components/payments/PaymentForm";
import PaymentHistory from "../components/payments/PaymentHistory";
import { getPaymentHistory } from "../services/paymentService";
import { getSaleById } from "../services/paymentService";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { ArrowLeft, CreditCard, History } from "lucide-react";

const PaymentPage = () => {
  const { sellingId } = useParams();
  const [sale, setSale] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [saleData, historyData] = await Promise.all([
        getSaleById(sellingId),
        getPaymentHistory(sellingId),
      ]);
      setSale(saleData);
      setPaymentHistory(historyData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [sellingId]);

  useEffect(() => {
    fetchData();
  }, [sellingId, refreshKey, fetchData]);

  const handlePaymentSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

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
      <button
        onClick={() => window.history.back()}
        className="flex items-center bg-primary text-white mb-4 p-2 rounded-lg hover:bg-secondary"
      >
        <ArrowLeft className="mr-1" size={16} /> Kembali
      </button>

      <article className="bg-slate-200 rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <CreditCard className="mr-2" />
          Pembayaran Transaksi #{sale.transaction_number}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600 mb-6">
          <div>
            <p className="font-semibold">Tanggal</p>
            <p>{new Date(sale.date).toLocaleDateString("id-ID")}</p>
          </div>
          <div>
            <p className="font-semibold">Marketing</p>
            <p>{sale.marketing?.name || "-"}</p>
          </div>
          <div>
            <p className="font-semibold">Grand Total</p>
            <p className="text-lg font-bold text-primary">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(sale.grand_total)}
            </p>
          </div>
        </div>
      </article>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-slate-200 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <History className="mr-2" /> Riwayat Pembayaran
            </h2>
            <PaymentHistory paymentHistory={paymentHistory} />
          </div>
        </div>

        <div>
          <PaymentForm
            sellingId={sellingId}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </div>
      </section>
    </section>
  );
};

export default PaymentPage;
