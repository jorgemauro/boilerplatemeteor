import React, {useState} from 'react';
import Signup from "./pages/Signup";
import {Login} from "./pages/Login";
import {Resetpssw} from "./pages/Resetpssw";
import {VerifyEmail} from "./pages/VerifyEmail";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import RecoverPassword from "./pages/RecoverPassword";
import CircularProgress from '@material-ui/core/CircularProgress';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#edbd65', dark: '#b88d37', light: '#ffef95',
            contrastText: '#2b3343',
        },
        secondary: {
            main: '#545C6E', dark: '#2b3343', light: '#81899c',
            contrastText: '#fff',
        }

    }
});
const App = () => {

    const [loading, setLoading] = useState(false);
    const isLoading = (load)=>{setLoading(load)};
    const rest = {
        isloading:isLoading,
        teste:'testando',
    };
    return (

        <div>
            <Router>
                <div>
                    <MuiThemeProvider theme={theme}>
                        {loading && <div style={{
                            width: '100vw', height: '100vh', position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: '#333',
                            transition: 'all .5s,z-index 0ms',
                            opacity: .5,
                            visibility: 'visible',
                            zIndex: 99,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }
                        }>
                            <CircularProgress/>
                        </div>}
                        <CssBaseline/>
                        <Route path='/' exact render={(props)=><Login {...props} isLoading={isLoading}/>}/>
                        <Route path="/signup" exact render={(props)=><Signup {...props} isLoading={isLoading}/>}/>
                        <Route path="/recovery" exact render={(props)=><RecoverPassword {...props} isLoading={isLoading}/>} />
                        <Route path="/reset-password/:token" exact render={(props)=><Resetpssw {...props} isLoading={isLoading}/>}/>
                        <Route path="/verify-email/:token" exact render={(props)=><VerifyEmail {...props} isLoading={isLoading}/>}/>
                    </MuiThemeProvider>
                </div>
            </Router>
        </div>
    );
};

export default App;
