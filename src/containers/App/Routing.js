import React, {useContext} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Navbar from "../../components/Navbar";
import { UserSessionContext } from '../../contexts/UserSession';

import About from "../About";
import Landing from "../Landing";
import Home from "../Home";
import Goto from "../Goto";
import Login from "../Login";
import Register from "../Register";
import ForgotPassword from "../ForgotPassword";

export default function Routing() {
    const { currentUsername } = useContext(UserSessionContext);
    console.log('current username -> ' + currentUsername)
    console.log(currentUsername != null || currentUsername == "")

    function DecisionRoute({ isLoggedIn, ...rest }) {
        return (
            isLoggedIn
                ? <Route {...rest} />
                : <Redirect to="/"/>
        )
    }

    return (
        <div>
            <Router basename="owenk165.github.io/Jom" >
                <div>
                    <Navbar/>
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/Landing">
                            <Landing />
                        </Route>
                        <Route path="/Goto">
                            <Goto />
                        </Route>
                        <DecisionRoute isLoggedIn={(currentUsername != null || currentUsername != "")} path="/Login">
                            <Login />
                        </DecisionRoute>
                        <DecisionRoute isLoggedIn={(currentUsername != null || currentUsername != "")} path="/Register">
                            <Register />
                        </DecisionRoute>
                        <DecisionRoute isLoggedIn={(currentUsername != null || currentUsername != "")} path="/Forgot_password">
                            <ForgotPassword />
                        </DecisionRoute>
                        <Route path="/">
                            <Landing />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}