import React from 'react';
import './App.css';
import Products from "./components/Products";
import Login from "./components/Login";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import LoginAndSignUp from "./components/LoginAndSignUp"
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <LoginAndSignUp/>
        {/*<AppHeader/>*/}
        {/*/!*<Login/>*!/*/}
        {/*<Products />*/}
        {/*<AppFooter/>*/}
        <Router>
            <Link to={"home"}>HOME</Link>
            <Link to={"about"}>ABOUT</Link>
            <Link to={"/"}>LOGIN</Link>
            <Switch>
                <Route path={"/about"}>
                    <About />
                </Route>
                <Route path={"/home"}>
                    <Home />
                </Route>
                <Route path={"/"}>
                    <LoginAndSignUp />
                </Route>

                Teaubgkfjghrblrgbtdh
            </Switch>

        </Router>
    </div>
  );
}

export default App;
