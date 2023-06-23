import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/Register";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Articles from "./components/Articles";
import Comments from "./components/Comments";
import DetailUser from "./components/DetailUser";
import DetailArticle from "./components/DetailArticle";
function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:name/comments" element={<Comments />} />
            <Route path="/users/:userName" element={<DetailUser />} />
            <Route path="/articles/:slug" element={<DetailArticle />} />
          </Routes>
        </Layout>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
