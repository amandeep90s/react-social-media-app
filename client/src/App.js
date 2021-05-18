import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
// Css
import "semantic-ui-css/semantic.min.css";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Components
import MenuBar from "./components/MenuBar";

// Auth Context
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Container>
                    <MenuBar />
                    <Route exact path="/" component={Home} />
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/register" component={Register} />
                </Container>
            </Router>
        </AuthProvider>
    );
};

export default App;
