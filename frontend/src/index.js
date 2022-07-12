import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/admin-login";
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
        <Route path="admin-login" element={<Home />} />
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