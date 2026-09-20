import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Payments from "./pages/Payments";
import Recharge from "./pages/Recharge";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/accounts"
            element={<Accounts />}
          />

          <Route
            path="/payments"
            element={<Payments />}
          />

          <Route
            path="/recharge"
            element={<Recharge />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
