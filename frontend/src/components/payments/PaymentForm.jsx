import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Wallet } from "lucide-react";
import { createPayment } from "../../services/paymentService";

const PaymentForm = ({ sellingId, onPaymentSuccess }) => {
  const [formData, setFormData] = useState({
    amount_paid: "",
    payment_date: new Date(),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const formattedDate = new Date(formData.payment_date)
        .toISOString()
        .split("T")[0];

      await createPayment({
        selling_id: parseInt(sellingId),
        amount_paid: parseInt(formData.amount_paid),
        payment_date: formattedDate,
      });

      onPaymentSuccess();
      setFormData({
        amount_paid: "",
        payment_date: new Date(),
      });
    } catch (err) {
      console.log("Error creating payment:", err);
      setError(err || "Terjadi error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="bg-slate-200 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Wallet className="mr-2" size={20} /> Catat Pembayaran
      </h3>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Jumlah Bayar (Rp)</label>
          <input
            type="number"
            name="amount_paid"
            value={formData.amount_paid}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 mb-2 flex items-center">
            <Calendar className="mr-2" size={16} /> Tanggal Bayar
          </label>
          <DatePicker
            selected={formData.payment_date}
            onChange={(date) =>
              setFormData({ ...formData, payment_date: date })
            }
            dateFormat="dd/MM/yyyy"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Pembayaran"}
        </button>
      </form>
    </article>
  );
};

export default PaymentForm;
