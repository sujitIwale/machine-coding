import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import NestedCheckboxTree from "./pages/NestedCheckBox/NestedCheckBox";
import Clock from "./pages/Clock/Clock";
import FolderTreePage from "./pages/FolderTree/FolderTreePage";
import InfiniteScroll from "./pages/InfiniteScroll/v1/InfiniteScroll";
import InfiniteScrollV2 from "./pages/InfiniteScroll/v2/InfiniteScrollV2";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
       <Route element={<Layout />}>
          <Route path="/nested-checkbox" Component={NestedCheckboxTree} />
          <Route path="/clock" Component={Clock} />
          <Route path="/folder-tree" Component={FolderTreePage} />
          <Route path="/infinite-scroll" Component={InfiniteScroll} />
          <Route path="/infinite-scroll/v2" Component={InfiniteScrollV2} />
       </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
