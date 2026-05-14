import GlobalFooter from "./components/GlobalFooter/GlobalFooter";
import GlobalHeader from "./components/GlobalHeader/GlobalHeader";
import ProductBoard from "./components/ProductBoard/ProductBoard";

function App() {
  return (
    <>
      <GlobalHeader />
      <main>
        <ProductBoard />
      </main>
      <GlobalFooter />
    </>
  );
}

export default App;