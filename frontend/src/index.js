import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Layouts
import Admin from "./admin/layout/Layout"; // Admin
import Layout from "./user/layout/Layout" // User


//  Admin 
import Home from "./admin/pages/Login";
import Records from "./admin/pages/Records";
import Players from "./admin/pages/Players";
import Import from "./admin/pages/Import";
import ManagePlayer from "./admin/pages/ManagePlayer";

// User
import LiveRatings from "./user/pages/LiveRatings";
import Charts from "./user/pages/Charts";
import About from "./user/pages/About"

import NoPage from "./user/pages/NoPage";

const root = createRoot(document.getElementById("root"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="admin-login" element={<Home />} />

        <Route path="/admin/" element={<Admin />}>
          <Route path="/admin/" element={<Records />} />

          <Route path="players" element={<Players />} />
          <Route path="players/manage" element={<ManagePlayer />} />
          

          <Route path="import" element={<Import />} />
        </Route>




        <Route path="/" element={<Layout />}>
          <Route index element={<LiveRatings />} />
          <Route path="charts" element={<Charts />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

root.render(<App />);