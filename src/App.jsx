import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import GlobalStyles from "./Styles/GlobalStyles";
import app from "./firebase.js";
import Profile from "./Pages/Profile";
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import ShoppingBasket from "./Pages/ShoppingBasket";
import Cats from "./Pages/Cats";

function App() {
  const [products, setProducts] = useState([]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Cats" element={<Cats setProducts={setProducts} products={products} />} />
              <Route path="/ShoppingBasket" element={<ShoppingBasket />} />
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
