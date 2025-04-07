import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import AdvertisingCenter from "./pages/AdvertisingCenter";
import Users from "./pages/Users";
import GoldUsers from "./pages/GoldUsers";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import "./App.css";
import HelpCenter from "./pages/HelpCenter";
import HelpCenterStart from "./pages/HelpCenterStart";
import GuestRoute from "./components/GuestRoute";
import ListUsers from "./pages/ListUsers";
import Rental from "./pages/Rental";
import RevenueManagement from "./pages/RevenueManagement";
import MembershipPackageScreen from "./pages/Pack";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={ 
              <Layout>
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/help"
            element={
              <Layout>
                <ProtectedRoute>
                  <HelpCenter />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/starthelp"
            element={
              <Layout>
                <ProtectedRoute>
                  <HelpCenterStart />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/ads"
            element={
              <Layout>
                <ProtectedRoute>
                  <AdvertisingCenter />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/rental"
            element={
              <Layout>
                <ProtectedRoute>
                  <Rental />
                </ProtectedRoute>
              </Layout>
            }
          />
           <Route
            path="/revenue"
            element={
              <Layout>
                <ProtectedRoute>
                  <RevenueManagement />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/pack"
            element={
              <Layout>
                <ProtectedRoute>
                  <MembershipPackageScreen />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/users/list"
            element={
              <Layout>
                <ProtectedRoute>
                  <ListUsers />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/users/gold"
            element={
              <Layout>
                <ProtectedRoute>
                  <GoldUsers />
                </ProtectedRoute>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
