import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MarketPage from "./features/market/MarketPage";
import "./styles/reset.css";
import "./styles/layout.css";
import "./styles/grid.css";
function App() {
  return (
    <>
      <Header />
      <MarketPage />
      <Footer />
    </>
  );
}

export default App;
