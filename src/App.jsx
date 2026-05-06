import React from "react";
import { Routes, Route } from "react-router-dom";

import "@/App.css";
import Board from "@/pages/Board";
import Faq from "@/pages/Faq";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import Products from "@/pages/Products";

import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Main />}></Route>
          <Route path='board' element={<Board />}></Route>
          <Route path='items' element={<Products />}></Route>
          <Route path='faq' element={<Faq />}></Route>
          <Route path='privacy' element={<Privacy />}></Route>
        </Route>

        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}
