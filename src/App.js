import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShopCard from "./pages/ShopCard";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import { useSelector } from "react-redux";
import Loading from "./utils/Loading.jsx";
import { useEffect, useState } from "react";
import AdminHeader from "./components/adminPanel/AdminHeader";
import NotFound from "./pages/NotFound";
import Categories from "./components/adminPanel/Categories";
import Products from "./components/adminPanel/Products";
import AddCategory from "./components/adminPanel/AddCategory";
import AddProduct from "./components/adminPanel/AddProduct";
import AdminHome from "./adminPages/AdminHome";
import SubProducts from "./components/adminPanel/SubProducts";
import EditCategory from "./components/adminPanel/EditCategory";

function App() {
  const { logging } = useSelector((store) => store.currentUser);

  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    if (localStorage.getItem("currentUser")) {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, [token]);

  console.log(token, currentUser);

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      {logging && <Loading />}
      <div className="App">
        {token ? (
          currentUser.roles.map((r) => r.roleName).includes("Admin") ? (
            <AdminHeader token={token} />
          ) : (
            <Header token={token} />
          )
        ) : (
          <Header token={token} />
        )}
        <div className="main">
          <Routes>
            <Route
              path="/"
              element={
                token ? (
                  currentUser.roles.map((r) => r.roleName).includes("Admin") ? (
                    <AdminHome />
                  ) : (
                    <Home />
                  )
                ) : (
                  <Home />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/card" element={<ShopCard />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/sub_products" element={<SubProducts />} />
            <Route path="/admin/categories/add" element={<AddCategory />} />
            <Route
              path="/admin/categories/update/:id"
              element={<EditCategory />}
            />
            <Route path="/admin/products/add" element={<AddProduct />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
