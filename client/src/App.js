import React,{Component} from 'react';
import './App.css';
import Products from "./components/Products";
import Login from "./components/Login";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Protected from "./components/Protected";
import {BrowserRouter as Router, Switch, Link, Route, Redirect} from 'react-router-dom';

class App extends Component{
    constructor(props) {
        super(props);
        this.state={
            isLoggedIn: false,
            loggedInUsername:null
        }
    }
    render(){
        return (
            <div className="App">
                {/*<LoginAndSignUp/>*/}
                {/*<AppHeader/>*/}
                {/*/!*<Login/>*!/*/}
                {/*<Products />*/}
                {/*<AppFooter/>*/}
                <Router>
                    {/*<Link to="home">HOME</Link>*/}
                    {/*/!*<Link to={"about"}>ABOUT</Link>*!/*/}
                    {/*<Link to="/">LOGIN</Link>*/}
                    <Switch>
                        {/*<Route path={"/about"}>*/}
                        {/*    <About />*/}
                        {/*</Route>*/}
                        <Route path="/home">
                            {/*<Home />*/}
                            <AppHeader/>
                            {/*<Protected cmp={AppHeader}/>*/}
                            <Protected cmp={Products}/>
                            <AppFooter/>
                            {/*<Protected cmp={AppFooter}/>*/}
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/">
                            <AppHeader/>
                        </Route>

                    </Switch>
                </Router>
            </div>
        );
    }

}
export default App;