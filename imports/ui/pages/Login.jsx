import React, {Component, useState, useEffect} from 'react';
import {TextField, Button} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import validator from 'validator';
import {compose,} from 'react-komposer';
import { useWindowDimensions } from '../components/WindowDimensionsProvider'
import RecoverPassword from "./RecoverPassword";

const postDataLoader=(props, onData)=>{
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
const LoginScreen = (props) => {
    const [loged, setLoged] = useState(false);
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [pssw, setPssw] = useState('');
    useEffect(() => {
        if (Meteor.userId() && Meteor.users.findOne(Meteor.userId())) {
            setLoged(true);
            setNome(Meteor.users.findOne(Meteor.userId()).username);
        } else {
            setLoged(false);
        }
    });
const tradutor=(strings)=>{
    switch(strings){
        case 'User not found':
            return 'Usuario não existe';
        case 'Incorrect password':
            return "Senha incorreta";
        case'Match failed':
            return 'Preencha todos os campos';
        default:
            return strings;
    }
    }
    ;
    // responsavel por fazer o login no sistema
    const login = () => {
        const dialog = props.snackOpenMsg;
        Meteor.loginWithPassword(email, pssw, (result) => {
            if (!result)
                setLoged(true);
            else
            {
                dialog(true, tradutor(result.reason));}
        });
    };
    // funcao que executa o logout do sistema
    const logout = () => {
        Meteor.logout(() =>
            setLoged(false));
    };
    const {width, height} = useWindowDimensions();
    const screenlimit = width>767;
    const compareEmail=()=>!validator.isEmail(email) && email !=='';
    console.log(email);
    console.log('compareemail', email!=='');
    console.log('validador',validator.isEmail(email));
    return (
        !loged ? <div style={styles.screen}>
            <Card className={screenlimit?'card':'card-is-vertical'}>
                <div style={screenlimit?styles.imageContainer: styles.imageContainerMobile}>
                    <img style={styles.image} src='/image/login.svg'/>
                </div>
                <div style={screenlimit?styles.fields:styles.fieldsMobile}>
                    <TextField className="marginFields" error={compareEmail()}
                               helperText={compareEmail()?'E-mail invalido': ''}
                               fullWidth
                               onChange={event => setEmail(event.target.value)} label="E-mail"/>
                    <TextField className="marginButton" onChange={event => setPssw(event.target.value)} fullWidth
                               label="Senha"
                               type="password"/>
                    <Button className="marginBtwButtons" variant='contained' color='primary' onClick={login}
                            fullWidth>Entrar</Button>
                    <Button className="marginButton" variant='outlined' color='secondary'
                            onClick={() => props.history.push('/signup')}
                            fullWidth>Cadastrar</Button>
                    <a onClick={() => props.history.push('/recovery')}>Esqueceu sua senha?</a>
                </div>
            </Card>
        </div> : <div style={styles.screen}><Card style={styles.card} className='card-is-vertical'>
            <h1>Que bom que você esta por aqui {nome}</h1>
            <Button className="marginFields" variant='contained' color='primary' onClick={logout}>Logout</Button>
        </Card>
        </div>
    );
};
const options = {
    loadingHandler: () => (<p>Loading...</p>)
};
export const Login = compose(postDataLoader, options)(LoginScreen);