import { BrowserRouter as Router, Routes, Route } from "react-router";
import PaymentPage from "./pages/PaymentPage";
import SalesPage from "./pages/SalesPage";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import CommissionPage from "./pages/CommisionPage";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />

          <main className="flex-1 overflow-y-auto p-1 md:p-2">
            <Routes>
              <Route path="/" element={<CommissionPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/payments/:sellingId" element={<PaymentPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
