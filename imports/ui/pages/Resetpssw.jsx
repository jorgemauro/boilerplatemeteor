import React, {Component, useState} from 'react';
import {TextField, Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import validator from 'validator';
import {Meteor} from "meteor/meteor";
import {compose} from "react-komposer";
import {Accounts} from "meteor/accounts-base";
import {useWindowDimensions} from "../components/WindowDimensionsProvider";

function postDataLoader(props, onData) {
        onData(null, props);
}

const styles = {
    screen: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(211.63deg, #545C6E 22.52%, rgba(255, 255, 255, 0) 85.38%), #2B3343',
    },
    card: {display: 'flex', width: '80%', height: '80%'},
    imageContainer: {
        width: '50%',
        height: '100%',
        backgroundColor: "#545c6e",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainerMobile: {
        width: '98%',
        height: '35%',
        backgroundColor: "#545c6e",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {width: '50%', height: '100%'},
    imageMobile: {width: '60%'},
    fields: {
        width: '50%',
        display: 'flex',
        flexFlow: 'column    ',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    fieldsMobile: {
        width: '100%',
        display: 'flex',
        flexFlow: 'column    ',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    }
};

const ResetpsswScreen=(props)=>{

    const [changed, setChanged] = useState(false);
    const [pssw, setPssw] = useState('');
    const [psswConfirm, setPsswConfirm] = useState('');
    const resetpssw = () => {
        if (comparePsw()) {
            props.isLoading(true);
            Accounts.resetPassword(props.match.params.token,pssw, (resp) => {
                if (resp) {
                    props.snackOpenMsg(true,resp.reason)
                } else
                    setChanged(true);
                props.isLoading(false);
            });
        } else
            props.snackOpenMsg(true,'As senhas não são iguais');
    };
    const comparePsw = () => {
        return pssw === psswConfirm
    };
    const {width, height} = useWindowDimensions();
    const screenlimit = width>767;
        return (
            <div style={styles.screen}>
                <Card className={screenlimit?'card':'card-is-vertical'}>
                    <div style={screenlimit?styles.imageContainer: styles.imageContainerMobile}>
                        <img style={styles.image} src='/image/pssw.svg'/>
                    </div>
                    {changed ?
                        <div style={screenlimit?styles.fields:styles.fieldsMobile}><h2>Sua senha foi modificada</h2></div> :

                        <div style={screenlimit?styles.fields:styles.fieldsMobile}>
                            <TextField className="marginFields" fullWidth
                                       onChange={event => setPssw(event.target.value)}
                                       label="digite sua nova senha"
                                       type="password"/>
                            <TextField className="marginButton" error={!comparePsw()}
                                       helperText={comparePsw() ? '' : 'A duas senhas não são identicas'}
                                       onChange={event => setPsswConfirm(event.target.value)} fullWidth
                                       label="confirmação da senha" type="password"/>
                            <Button variant='contained' color="primary" onClick={resetpssw} fullWidth>Salvar
                                senha</Button>
                        </div>}
                </Card>
            </div>
        );
}

const options = {
    loadingHandler: () => (<p>Loading...</p>)
};
export const Resetpssw = compose(postDataLoader, options)(ResetpsswScreen);