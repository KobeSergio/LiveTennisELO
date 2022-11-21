import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./app/store";
import { Provider } from "react-redux";

// Layouts
import Admin from "./admin/layout/Layout"; // Admin
import Layout from "./user/layout/Layout"; // User

//  Admin
import Login from "./admin/pages/Login";
import Records from "./admin/pages/Records";
import AdminPlayers from "./admin/pages/Players";
import Import from "./admin/pages/Import";
import ManagePlayer from "./admin/pages/ManagePlayer";
import AdminTournament from "./admin/pages/AdminTournament";
import AdminTournaments from "./admin/pages/AdminTournaments";

// User
import LiveRatings from "./user/pages/LiveRatings";
import Player from "./user/pages/Player";
import Charts from "./user/pages/Charts";
import Players from "./user/pages/Players";
import About from "./user/pages/About";
import H2H from "./user/pages/H2H";
import NoPage from "./user/pages/NoPage";
import Tournaments from "./user/pages/Tournaments";
import Tournament from "./user/pages/Tournament";

const root = createRoot(document.getElementById("root"));

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Admin page routes */}
          <Route path="/admin-login" element={<Login />} />
          <Route path="/admin/" element={<Admin />}>
            <Route index path="players" element={<AdminPlayers />} />
            <Route path=":doc_date" element={<Records />} />
            <Route path="players/:player_id" element={<ManagePlayer />} />
            <Route
              path="tournaments/:tourney_id"
              element={<AdminTournament />}
            />
            <Route path="tournaments" element={<AdminTournaments />} />
            <Route path="import" element={<Import />} />
          </Route>

          {/* User page routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<LiveRatings />} />
            <Route path="players/H2H" element={<H2H />} />
            <Route path="players/:player_id" element={<Player />} />
            <Route path="charts" element={<Charts />} />
            <Route path="players" element={<Players />} />
            <Route path="tournaments/:tourney_id" element={<Tournament />} />
            <Route path="tournaments" element={<Tournaments />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

root.render(<App />);
