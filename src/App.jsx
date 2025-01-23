import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Topbutton from "./linkbutton";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Mobiledata from "./productPage/mobileproductlog";
import Mobilecart from "./productPage/Mobilecart";
import LoginPage from "./Loginpage/loginPage";
import RegisterPage from "./Loginpage/registerPage";
import { Successpage } from "./productPage/success";
import OrderSummaryPage from "./productPage/orders";
import { Forgetpassword } from "./Loginpage/forgetPassword";
import { Changepassword } from "./Loginpage/changepassword";
import { SuccessLogin } from "./Loginpage/loginSuccess";
import { Rejectspage } from "./productPage/reject";
import { NotFound } from "./Loginpage/404ERROR";
function App() {
  let PrivateRouter = ({ component }) => {
    let isAuthenticated = Boolean(JSON.parse(localStorage.getItem("userData")));
    if (isAuthenticated) {
      return component;
    } else {
      return <Navigate to={"/"} />;
    }
  };
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/auth/loginSuccess" element={<SuccessLogin />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/forgetpassword" element={<Forgetpassword />}></Route>
            <Route path="/changepassword" element={<Changepassword />}></Route>
            <Route element={<Topbutton />}>
              <Route
                path="/products"
                element={<PrivateRouter component={<Mobiledata />} />}
              />
              <Route
                path="/cart"
                element={<PrivateRouter component={<Mobilecart />} />}
              />
              <Route path="/success" element={<PrivateRouter component={<Successpage />} />} />
              <Route path="/reject" element={<PrivateRouter component={<Rejectspage />} />} />
              <Route path="/order" element={<PrivateRouter component={<OrderSummaryPage />} />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
