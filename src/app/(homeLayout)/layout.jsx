import AppNavbar from "../ui/Navbar";
import Footer from "../ui/Footer";

export default function HomeLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppNavbar />
      <main className="flex-grow min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
