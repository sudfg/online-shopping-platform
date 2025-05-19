import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/product/:id" component={ProductDetails} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </div>
  );
}

export default App;
