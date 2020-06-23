import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Header from "./components/common/Header";
import ProductsRoute from "./routes/Products";
import ProductRoute from "./routes/Product";
import ProductEditRoute from "./routes/ProductEdit";

import "antd/dist/antd.css";
import "./App.css";
import HomeRoute from "./routes/Home";
import ProductCreateRoute from "./routes/ProductCreate";

function App() {
  // const location = useLocation();

  // @ts-ignore
  // let background = location.state && location.state.background;

  return (
    <div className="App">
      <Header title="All Products" />
      <Switch>
        <Route path="/products/create">
          <ProductCreateRoute />
        </Route>
        <Route path="/products/:slug/edit" exact>
          <ProductEditRoute />
        </Route>
        <Route path="/products/:slug" exact>
          <ProductRoute />
        </Route>
        <Route path="/products" exact>
          <ProductsRoute />
        </Route>
        <Route path="/" exact>
          <HomeRoute />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
