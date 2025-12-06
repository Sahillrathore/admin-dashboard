import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Layout from "./components/Layout";

// Pages
import Commission from "./pages/Commission";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import AffiliateCommission from "./pages/AffiliateCommission";
import AddSpecialCommission from "./pages/AddSpecialcommission";
import AffiliateCoupons from "./pages/AffiliateCoupons";
import AffiliatePayments from "./pages/AffiliatePayments";
import FaqCustomization from "./pages/FaqCustomization";
// import Doctors from "./pages/Doctors";
// import Patients from "./pages/Patients";
// Add all other pages...

const App = () => {
  return (
    <Router>
      <Header />

      <Layout>
        <Routes>
          {/* DEFAULT ROUTE → /dashboard */}
          <Route path="/" element={<Navigate to="/affiliate/dashboard" replace />} />

          {/* MAIN ROUTES */}
          <Route path="/affiliate/dashboard" element={<AffiliateDashboard />} />
          <Route path="/affiliate/commission" element={<AffiliateCommission />} />
          <Route path="/affiliate/commission/special-commission" element={<AddSpecialCommission />} />
          <Route path="/affiliate/coupons" element={<AffiliateCoupons />} />
          <Route path="/affiliate/payments" element={<AffiliatePayments />} />

          <Route path="/customization/faq" element={<FaqCustomization />} />

          {/* <Route path="/doctors" element={<Doctors />} /> */}
          {/* <Route path="/patients" element={<Patients />} /> */}

          {/* Add more routes here */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
