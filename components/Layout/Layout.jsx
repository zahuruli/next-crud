import Footer from "../Footer/Footer";
import Navbar from "../Nabvar/Navbar";

const Layout = ({ children, onShowModal }) => {
  return (
    <main className="h-screen w-screen  bg-gray-600">
      <header className="h-screen-10 bg-white border-solid  ">
        {" "}
        <Navbar onShowModal={onShowModal} />{" "}
      </header>
      <div className="h-screen-85 w-screen-80 mx-auto overflow-scroll overflow-x-hidden bg-gray-400 p-1 rounded-b-2xl">
        {children}
      </div>
      <footer className="h-screen-5  text-white bg-gray-600">
        <Footer />{" "}
      </footer>
    </main>
  );
};

export default Layout;
