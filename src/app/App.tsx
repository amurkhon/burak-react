import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import UserPage from "./screens/UserPage";
import OrdersPage from "./screens/ordersPage";
import HelpPage from "./screens/helpPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import { useState } from "react";
import { CartItem } from "../lib/types/search";
import useBasket from "./hooks/useBasket";

function App() {
  const location = useLocation();
  const {cartItems, onAdd, onRemove, onDelete, onDeleteAll} = useBasket();
  return (
    <>
    {
      location.pathname === "/" 
        ? <HomeNavbar 
            cartItems = {cartItems} 
            onAdd = {onAdd}
            onRemove = {onRemove} 
            onDelete = {onDelete}
            onDeleteAll = {onDeleteAll}
          /> 
        : <OtherNavbar 
            cartItems = {cartItems} 
            onAdd = {onAdd}
            onRemove = {onRemove} 
            onDelete = {onDelete}
            onDeleteAll = {onDeleteAll}
          />
    }
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd = {onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;





