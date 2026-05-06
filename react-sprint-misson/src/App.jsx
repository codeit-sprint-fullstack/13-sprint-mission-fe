import "./App.css";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <Header />
      <main>
        <LandingPage />
        {/* <Products /> */}
      </main>
      <Footer />
    </>
  );
}

export default App;
