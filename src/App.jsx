import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// Pages
import Header from "./components/Header";
import Layout from "./components/Layout";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import AffiliateCommission from "./pages/AffiliateCommission";
import AddSpecialCommission from "./pages/AddSpecialcommission";
import AffiliateCoupons from "./pages/AffiliateCoupons";
import AffiliatePayments from "./pages/AffiliatePayments";
import FaqCustomization from "./pages/FaqCustomization";
import AddSpecialCoupon from "./pages/AddSpecialCoupon";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* All routes that use Header + Layout */}
        <Route element={<AppLayout />}>
          {/* Default redirect */}
          <Route
            path="/"
            element={<Navigate to="/affiliate/dashboard" replace />}
          />

          <Route path="/affiliate/dashboard" element={<AffiliateDashboard />} />
          <Route
            path="/affiliate/commission"
            element={<AffiliateCommission />}
          />
          <Route
            path="/affiliate/commission/special-commission"
            element={<AddSpecialCommission />}
          />
          <Route
            path="/affiliate/commission/special-coupon"
            element={<AddSpecialCoupon />}
          />
          <Route path="/affiliate/coupons" element={<AffiliateCoupons />} />
          <Route path="/affiliate/payments" element={<AffiliatePayments />} />
          <Route path="/customization/faq" element={<FaqCustomization />} />
        </Route>

        {/* 404 – this route does NOT use Layout or Header */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;


// AppLayout.jsx (or inside App.jsx)

const AppLayout = () => {
  return (
    <>
      <Header />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

