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
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import {amber, green} from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import WindowDimensionsProvider from './components/WindowDimensionsProvider.jsx'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {makeStyles} from '@material-ui/core/styles';
import {useWindowDimensions} from "./components/WindowDimensionsProvider";

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
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};
const MySnackbarContentWrapper = (props) => {
    const classes = useStyles1();
    const {className, message, onClose, variant, ...other} = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)}/>
                    {message}
        </span>
            }
            action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon}/>
                </IconButton>,
            ]}
            {...other}
        />
    );
};
MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};
const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));
const useStyles2 = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));
const App = () => {

    const [snackbar, setSnackbar] = useState(false);
    const [msgsnackbar, setMsgSnackbar] = useState('');
    const [loading, setLoading] = useState(false);
    const [variantDialog, setVariantDialog] = useState('error');
    const isLoading = (load) => {
        setLoading(load);
    };
    const snackOpenMsg = (openSnack, msg = '', variantdia = '') => {
        setSnackbar(openSnack);
        if (msg !== '')
            setMsgSnackbar(msg);
        if (variantdia !== '')
            setVariantDialog(variantdia);
    };
    const classes = useStyles2();

    function handleClick() {
        setSnackbar(true);
    }

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar(false);
    }

    return (

        <WindowDimensionsProvider>
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
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={snackbar}
                            autoHideDuration={6000}
                            onClose={handleClose}
                        >
                            <MySnackbarContentWrapper
                                onClose={handleClose}
                                variant={variantDialog}
                                message={msgsnackbar}
                            />
                        </Snackbar>
                        <CssBaseline/>
                        <Route path='/' exact render={(props) => <Login {...props} isLoading={isLoading}
                                                                        snackOpenMsg={snackOpenMsg}/>}/>
                        <Route path="/signup" exact render={(props) => <Signup {...props} isLoading={isLoading}
                                                                               snackOpenMsg={snackOpenMsg}/>}/>
                        <Route path="/recovery" exact
                               render={(props) => <RecoverPassword {...props} isLoading={isLoading}
                                                                   snackOpenMsg={snackOpenMsg}/>}/>
                        <Route path="/reset-password/:token" exact
                               render={(props) => <Resetpssw {...props} isLoading={isLoading}
                                                             snackOpenMsg={snackOpenMsg}/>}/>
                        <Route path="/verify-email/:token" exact
                               render={(props) => <VerifyEmail {...props} isLoading={isLoading}
                                                               snackOpenMsg={snackOpenMsg}/>}/>
                    </MuiThemeProvider>
                </div>
            </Router>
        </WindowDimensionsProvider>
    );
};

export default App;
