import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';




import Home from "./pages/admin-login";
import Admin from "./pages/admin";
import Records from "./pages/records";

import Charts from "./pages/charts";
import Layout from "./pages/Layout"
import NoPage from "./pages/NoPage";
import LiveRatings from "./pages/index";

const container = document.getElementById('root');
const root = createRoot(container);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* admin login */}
      <Route path="admin-login" element={<Home />} />

{/* admin pages */}
        <Route path="/admin/" element={<Admin/>}>
          <Route index element={<Records />} />
          <Route path="charts" element={<Charts />} />
        </Route>

        {/* user side */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LiveRatings />} />
          <Route path="charts" element={<Charts />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

root.render(<App />);