import { Routes, Route } from "react-router";

import "@/App.css";
import MainLayout from "@/layouts/MainLayout";
import Board from "@/pages/Board";
import Faq from "@/pages/Faq";
import ItemDetail from "@/pages/ItemDetail";
import Items from "@/pages/Items";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import Registration from "@/pages/Registration";

export default function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Main />} />

          <Route path='items' element={<Items />} />
          <Route path='items/:itemId' element={<ItemDetail />} />
          <Route path='registration' element={<Registration />} />

          <Route path='board' element={<Board />} />
          <Route path='faq' element={<Faq />} />
          <Route path='privacy' element={<Privacy />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}
