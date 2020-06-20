import React,{Component} from 'react';
import './App.css';
import Products from "./components/Products";
import Login from "./components/Login";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Protected from "./components/Protected";
import MyAccount from "./components/MyAccount";
import BookAppointment from "./components/BookAppointment";
import {BrowserRouter , Switch, Link, Route, Redirect} from 'react-router-dom';


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
                <BrowserRouter>
                    {/*<Link to="home">HOME</Link>*/}
                    {/*/!*<Link to={"about"}>ABOUT</Link>*!/*/}
                    {/*<Link to="/">LOGIN</Link>*/}
                    <Switch>
                        {/*<Route path={"/about"}>*/}
                        {/*    <About />*/}
                        {/*</Route>*/}
                        <Route path="/home" strict exact>
                            {/*//to be fixed*/}
                            <Protected cmp={Products}/>
                        </Route>

                        <Route path="/login" strict exact>
                            <Login/>
                        </Route>
                        <Route path="/bookAppointment" component={BookAppointment} strict exact />

                        <Route path="/" strict exact>
                            <AppHeader/>
                        </Route>

                        <Route path="/myAccount" strict exact>
                            <Protected cmp={MyAccount}/>
                        </Route>


                    </Switch>
                </BrowserRouter>
            </div>
        );
    }

}
export default App;