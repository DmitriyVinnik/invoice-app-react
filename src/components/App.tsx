import React from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink, Redirect} from "react-router-dom";

import Toast from './Toast';
import CustomersPage from './pages/customers/CustomersPage';
import ProductsPage from './pages/products/ProductsPage';
import InvoicesPage from './pages/invoices/InvoicesPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.SFC = () => {
    return (
        <Router>
            <div>
                <nav>
                    <Toast/>
                    <ul>
                        <li>
                            <NavLink to="/invoices" activeStyle={{backgroundColor: 'red'}}>Invoices</NavLink>
                        </li>
                        <li>
                            <NavLink to="/customers" activeStyle={{backgroundColor: 'red'}}>Customer</NavLink>
                        </li>
                        <li>
                            <NavLink to="/products" activeStyle={{backgroundColor: 'red'}}>Products</NavLink>
                        </li>
                    </ul>
                </nav>
                <main>
                    <Switch>
                        <Redirect exact from='/' to='/invoices'/>
                        <Route path="/invoices" component={InvoicesPage}/>
                        <Route path="/customers" component={CustomersPage}/>
                        <Route path="/products" component={ProductsPage}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </main>
            </div>
        </Router>
    );
};

export default App;