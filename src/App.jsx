import Header from './components/Header'
import Footer from './components/Footer'
import BestProducts from './components/BestProducts'
import AllProducts from './components/AllProducts'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <BestProducts />
        <AllProducts />
      </main>
      <Footer />
    </>
  )
}
