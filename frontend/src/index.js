import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

//  ORGANIZE PAGES
import Home from "./pages/admin-login";
import Admin from "./pages/admin_layout";
import Records from "./pages/records";

import Charts from "./pages/charts";
import Players from "./pages/players";

import Layout from "./pages/Layout"
import NoPage from "./pages/NoPage";
import LiveRatings from "./pages/index";

const root = createRoot(document.getElementById("root"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="admin-login" element={<Home />} />

        <Route path="/admin/" element={<Admin />}>
          <Route path="/admin/" element={<Records />} />
          <Route path="players" element={<Players />} />
        </Route>


        <Route path="/" element={<Layout />}>
          <Route index element={<LiveRatings />} />
          <Route path="charts" element={<Charts />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

root.render(<App/>);