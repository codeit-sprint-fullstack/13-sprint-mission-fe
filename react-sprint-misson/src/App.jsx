import "./App.css";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Products from "./pages/Products";

function App() {
  return (
    <body>
      <Header />
      <main>
        <Products />
      </main>
      <Footer />
    </body>
  );
}

export default App;
