import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import Homepage from "@/pages/home/Homepage";
import TransactionPage from "@/pages/transaction/TransactionPage";
import CostumerPage from "@/pages/costumers/CostumerPage";
import NotFound from "@/pages/NotFound";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Homepage />} />
            <Route path="/transactions" element={<TransactionPage />} />
            <Route path="/customers" element={<CostumerPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
