import { Toaster } from "react-hot-toast";
import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";
import { Outlet } from "react-router";

const PublicLayout = () => {
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
