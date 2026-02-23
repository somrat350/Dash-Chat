import { Toaster } from "react-hot-toast";
import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";
import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "../components/PageLoader";

const PublicLayout = () => {
  const { checkAuth, userLoading, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (userLoading) return <PageLoader />;
  if (authUser) return <Navigate to="/conversation" replace />;
  return (
    <>
      <Toaster />
      <div className="flex flex-col min-h-screen">
        <nav className="sticky top-0 z-50">
          <Navbar />
        </nav>
        <section className="max-w-7xl mx-auto px-4 py-8 grow">
          <Outlet />
        </section>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default PublicLayout;
