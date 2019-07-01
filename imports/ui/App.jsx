import React from 'react';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {createMuiTheme, MuiThemeProvider}  from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import RecoverPassword from "./pages/RecoverPassword";

const theme = createMuiTheme({
    palette: {
        primary: {main: '#edbd65',dark:'#b88d37', light:'#ffef95',
            contrastText: '#2b3343',},
        secondary: {main: '#545C6E',dark:'#2b3343', light:'#81899c',
        contrastText: '#fff',}

    }
});
const App = () => (
    <div>
        <Router>
            <div>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Route path='/' exact component={Login}/>
                    <Route path="/signup" exact component={Signup}/>
                    <Route path="/recovery" exact component={RecoverPassword}/>
                </MuiThemeProvider>
            </div>
        </Router>
    </div>
);

export default App;
