import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import ClientHome from "./pages/ClientHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShopCard from "./pages/ShopCard";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./utils/Loading.jsx";
import { useEffect, useState } from "react";
import AdminHeader from "./components/adminPanel/AdminHeader";
import NotFound from "./pages/NotFound";
import Categories from "./components/Categories";
import Products from "./components/Products";
import AddCategory from "./components/adminPanel/AddCategory";
import AddProduct from "./components/adminPanel/AddProduct";
import AdminHome from "./adminPages/AdminHome";
import SubProducts from "./components/SubProducts";
import EditCategory from "./components/adminPanel/EditCategory";
import Footer from "./components/Footer";
import EditProduct from "./components/adminPanel/EditProduct";
import Users from "./components/adminPanel/Users";
import EditUser from "./components/adminPanel/EditUser";
import UnderConst from "./pages/UnderConst.jsx";
import ProductView from "./pages/ProductView";
import { loadingFail, loadingFinish, loadingStart } from "./redux/loadSlicer";
import { fetchCartItems } from "./redux/cartBoxSlicer";
import axios from "axios";
import CheckOut from "./pages/CheckOut";

function App() {
  const dispatch = useDispatch();
  const { logging } = useSelector((store) => store.currentUser);
  const { loading } = useSelector((store) => store.loadStatus);

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

  useEffect(() => {
    const fetchUsersCartBox = async () => {
      try {
        dispatch(loadingStart());
        const { data } = await axios.get(
          `https://my-ecom-back.herokuapp.com/api/v1/carts/user/get_all/${currentUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        dispatch(fetchCartItems(data));
        dispatch(loadingFinish());
      } catch (error) {
        dispatch(loadingFail());
        toast.error(error.response.data?.message);
      }
    };
    token && fetchUsersCartBox();
  }, [token, dispatch, currentUser.id]);

  return (
    <HashRouter>
      <ToastContainer position="bottom-center" limit={1} />
      {logging && <Loading />}
      {loading && <Loading />}
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
                    <ClientHome token={token} currentUser={currentUser} />
                  )
                ) : (
                  <ClientHome token={token} />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/cart_box"
              element={<ShopCard token={token} currentUser={currentUser} />}
            />
            <Route
              path="/check_out"
              element={<CheckOut token={token} currentUser={currentUser} />}
            />
            <Route
              path="/admin/categories"
              element={<Categories token={token} />}
            />
            <Route
              path="/products"
              element={<Products currentUser={currentUser} token={token} />}
            />
            <Route path="/admin/sub_products" element={<SubProducts />} />
            <Route
              path="/admin/categories/add"
              element={<AddCategory token={token} />}
            />
            <Route
              path="/admin/categories/update/:id"
              element={<EditCategory token={token} />}
            />
            <Route
              path="/product/view/:id"
              element={<ProductView token={token} />}
            />
            <Route
              path="/admin/products/update/:id"
              element={<EditProduct token={token} />}
            />
            <Route
              path="/admin/products/add"
              element={<AddProduct token={token} />}
            />
            <Route path="/admin/users" element={<Users token={token} />} />
            <Route
              path="/admin/update_user/:id"
              element={<EditUser token={token} />}
            />
            {/* <Route path="/add_cart/:id" element={<UnderConst />} /> */}
            <Route path="/developing" element={<UnderConst />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
