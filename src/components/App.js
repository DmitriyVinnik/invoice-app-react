import React from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom";
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import InvoicesPage from './pages/InvoicesPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <NavLink exact to="/" activeStyle={{backgroundColor: 'red'}}>Customer</NavLink>
                        </li>
                        <li>
                            <NavLink to="/products" activeStyle={{backgroundColor: 'red'}}>Products</NavLink>
                        </li>
                        <li>
                            <NavLink to="/invoices" activeStyle={{backgroundColor: 'red'}}>Invoices</NavLink>
                        </li>
                    </ul>
                </nav>
                <main>
                    <Switch>
                        <Route exact path="/" component={CustomersPage}/>
                        <Route path="/products" component={ProductsPage}/>
                        <Route path="/invoices" component={InvoicesPage}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}
