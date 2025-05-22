import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/polymet/layouts/main-layout";
import AuthLayout from "@/polymet/layouts/auth-layout";
import HomePage from "@/polymet/pages/home-page";
import LoginPage from "@/polymet/pages/login-page";
import RegisterPage from "@/polymet/pages/register-page";
import DocumentationHub from "@/polymet/pages/documentation-hub";
import DocumentationHubWithAPI from "@/polymet/pages/documentation-hub-with-api";
import SupplierDashboard from "@/polymet/pages/supplier-dashboard";
import CreateOfferWizard from "@/polymet/pages/create-offer-wizard";
import OfferDiscoveryPage from "@/polymet/pages/offer-discovery-page";
import MerchantDashboard from "@/polymet/pages/merchant-dashboard";
import MerchantWidgetConfiguration from "@/polymet/pages/merchant-widget-configuration";

export default function BuildConnectAppWithMerchantWidget() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />

        <Route
          path="/register"
          element={
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          }
        />

        <Route
          path="/documentation"
          element={
            <MainLayout>
              <DocumentationHub />
            </MainLayout>
          }
        />

        <Route
          path="/documentation/api"
          element={
            <MainLayout>
              <DocumentationHubWithAPI />
            </MainLayout>
          }
        />

        <Route
          path="/supplier-dashboard"
          element={
            <MainLayout>
              <SupplierDashboard />
            </MainLayout>
          }
        />

        <Route
          path="/supplier-dashboard/:orgId"
          element={
            <MainLayout>
              <SupplierDashboard />
            </MainLayout>
          }
        />

        <Route
          path="/merchant-dashboard"
          element={
            <MainLayout>
              <MerchantDashboard />
            </MainLayout>
          }
        />

        <Route
          path="/merchant-dashboard/:orgId"
          element={
            <MainLayout>
              <MerchantDashboard />
            </MainLayout>
          }
        />

        <Route
          path="/create-offer"
          element={
            <MainLayout>
              <CreateOfferWizard />
            </MainLayout>
          }
        />

        <Route
          path="/offer-discovery"
          element={
            <MainLayout>
              <OfferDiscoveryPage />
            </MainLayout>
          }
        />

        <Route
          path="/offer-discovery/:orgId"
          element={
            <MainLayout>
              <OfferDiscoveryPage />
            </MainLayout>
          }
        />

        <Route
          path="/merchant-widget-configuration"
          element={
            <MainLayout>
              <MerchantWidgetConfiguration />
            </MainLayout>
          }
        />

        <Route
          path="/merchant-widget-configuration/:orgId"
          element={
            <MainLayout>
              <MerchantWidgetConfiguration />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}
