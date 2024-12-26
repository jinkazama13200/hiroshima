import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Main from "./pages/main";
import Protected from "./routers/Protected";
import Users from "./pages/users/Users";
import Pagination from "./pages/pagination/Pagination";
import Grid from "./pages/grid";
import Movies from "./pages/movies/Movies";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route element={<Protected />}>
            <Route path="movies" element={<Movies />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
        <Route path="pagination" element={<Pagination />} />
        <Route path="grid" element={<Grid />} />
        <Route path="*" element={<h1>NOT FOUND</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
