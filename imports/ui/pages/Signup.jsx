import React, {Component, useState} from 'react';
import {TextField, Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import validator from 'validator';
import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {useWindowDimensions} from "../components/WindowDimensionsProvider";
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
const Signup =(props)=>{
    const [signed, setSigned] = useState(false);
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [pssw, setPssw] = useState('');
    const [psswConfirm, setPsswConfirm] = useState('');

    const signup = () => {
        props.isLoading(true);
        Accounts.createUser({username:nome, email:email, password:pssw, profile:nome},(resp)=>{
            if(resp)
                props.snackOpenMsg(true,resp.reason)
            else
                Meteor.call('signup',nome,(result)=>{
                    if(!result) {
                        setSigned(true);
                        props.isLoading(false);
                    }
                    else
                        alert(result);
                });
        });
    };
    const comparePsw=()=>{
        return pssw===psswConfirm
    };

    const {width, height} = useWindowDimensions();
    const screenlimit = width>767;
        return (
            <div style={styles.screen}>
                <Card className={screenlimit?'card':'card-is-vertical'}>
                    <div style={screenlimit?styles.imageContainer: styles.imageContainerMobile}>
                        <img style={screenlimit?styles.image:styles.imageMobile} src='/image/welcome.svg'/>
                    </div>
                    {signed?
                        <div style={screenlimit?styles.fields:styles.fieldsMobile}>
                        <h2>Verifique seu e-mail!</h2>
                        <Button variant="contained" color='secondary' onClick={()=>props.history.push('/')}>Login</Button>
                    </div>:<div style={styles.fields}>
                        <TextField className="marginFields" error={!validator.isEmail(email) && email !== ''}
                                   helperText={!validator.isEmail(email) && email === '' ? '' : 'E-mail invalido'}
                                   fullWidth
                                   onChange={event => setEmail(event.target.value)} label="E-mail"/>
                        <TextField className="marginFields"  fullWidth
                                   onChange={event => setNome(event.target.value)} label="Nome"/>
                        <TextField className="marginFields"   fullWidth onChange={event => setPssw(event.target.value)} label="Senha"
                                   type="password"/>
                        <TextField className="marginButton" error={comparePsw} helperText={comparePsw ? '' : 'A duas senhas não são identicas'}   onChange={event => setPsswConfirm(event.target.value)}   fullWidth label="confirmação da senha" type="password"/>
                        <Button className="marginBtwButtons" variant='contained' color="primary" onClick={signup} fullWidth>Cadastrar</Button>
                            <Button variant='contained' color="secondary" onClick={()=>props.history.push('/')} fullWidth>Login</Button>
                    </div>}
                </Card>
            </div>
        );
}
export default Signup;