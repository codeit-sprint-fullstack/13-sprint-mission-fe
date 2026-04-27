// App.jsx

// PC, Tablet, Mobile 디자인에 해당하는 중고마켓 페이지를 만들어 주세요.
// 상품 데이터는 https://panda-market-api.vercel.app/docs/에 명세된 GET 메소드 “/products” 를 사용해주세요.
// 중고마켓 페이지 url path는 별도로 설정하지 않고, ‘/’에 보이도록 합니다.
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./App.css";
import Article from "./components/Article";

function App() {
  return (
    <div className="App">
      <Nav />
      <Article />
      <Footer />
    </div>
  );
}

export default App;
