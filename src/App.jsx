import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BestProduct from "./components/Bestproduct/BestProduct";
import OnsaleProduct from "./components/Onsaleproduct/OnsaleProduct";

function App() {
  return (
    <div className="body">
      <Header />
      <BestProduct />
      <OnsaleProduct />
      <Footer />
    </div>
  );
}

export default App;
