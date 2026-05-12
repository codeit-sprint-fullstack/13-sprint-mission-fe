import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";

function ItemPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

export default ItemPage;
